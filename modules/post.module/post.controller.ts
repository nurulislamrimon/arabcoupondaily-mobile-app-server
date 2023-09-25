import { NextFunction, Request, Response } from "express";
import * as PostServices from "./post.services";
import { getUserByEmailService } from "../user.module/user.services";
import { Types } from "mongoose";
import { getStoreByStoreNameService } from "../store.module/store.services";

// add new Post controller
export const searchGloballyOnPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostServices.searchGloballyOnPostService(req.query);
    res.send({
      status: "success",
      data: result,
    });
    console.log(`global search is responsed!`);
  } catch (error) {
    next(error);
  }
};
// get a Post controller
export const getAPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const result = await PostServices.getPostByIdService(postId);
    if (!result) {
      throw new Error("Post not found!");
    } else {
      res.send({
        status: "success",
        data: result,
      });
      console.log(`Post ${result._id} is added!`);
    }
  } catch (error) {
    next(error);
  }
};
// add new Post controller
export const addNewPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postTitle, storeName, expireDate, country } = req.body;

    if (!postTitle || !storeName || !expireDate || !country) {
      throw new Error("Please enter required information!");
    } else {
      const postBy = await getUserByEmailService(req.body.decoded.email);
      const isStoreExist = await getStoreByStoreNameService(req.body.storeName);
      if (!isStoreExist) {
        throw new Error("Invalid store name!");
      } else {
        const result = await PostServices.addNewPostService({
          ...req.body,
          store: isStoreExist._id,
          postBy: { ...postBy?.toObject(), moreAboutUser: postBy?._id },
        });
        res.send({
          status: "success",
          data: result,
        });
        console.log(`Post ${result._id} is added!`);
      }
    }
  } catch (error) {
    next(error);
  }
};

// get all Posts
export const getAllPostsByAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostServices.getAllPosts(req.query, false);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`${result?.data?.length} Posts are responsed!`);
  } catch (error) {
    next(error);
  }
};

// get all active Posts
export const getAllActivePostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostServices.getAllPosts(req.query, true);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`${result?.data?.length} Posts are responsed!`);
  } catch (error) {
    next(error);
  }
};

// update a Post controller
export const updateAPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const existPost = await PostServices.getPostByIdService(postId);

    if (!existPost) {
      throw new Error("Post doesn't exist!");
    } else {
      const updateBy = await getUserByEmailService(req.body.decoded.email);
      const result = await PostServices.updateAPostService(postId, {
        ...req.body,
        existPost,
        updateBy: { ...updateBy?.toObject(), moreAboutUser: updateBy?._id },
      });

      res.send({
        status: "success",
        data: result,
      });
      console.log(`Post ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};

// revealed a Post controller
export const revealedAPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const existPost = await PostServices.getPostByIdService(postId);

    if (!existPost) {
      throw new Error("Post doesn't exist!");
    } else {
      const result = await PostServices.revealedAPostService(postId);

      res.send({
        status: "success",
        data: result,
      });
      console.log(`Post ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};

// update a Post controller
export const deleteAPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const existPost = await PostServices.getPostByIdService(postId);

    if (!existPost) {
      throw new Error("Post doesn't exist!");
    } else {
      const result = await PostServices.deleteAPostService(postId);

      res.send({
        status: "success",
        data: result,
      });
      console.log(`Post ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};
// update a Post controller
export const deleteManyPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIds = req.body.posts;
    if (!postIds) {
      throw new Error("posts are required!");
    }
    const result = await PostServices.deleteManyPostService(postIds);

    res.send({
      status: "success",
      data: result,
    });
    console.log(`Post ${result} is added!`);
  } catch (error) {
    next(error);
  }
};

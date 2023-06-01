import { NextFunction, Request, Response } from "express";
import * as PostServices from "./post.services";
import { getUserByEmailService } from "../user.module/user.services";
import { Types } from "mongoose";

// add new Post controller
export const searchGloballyOnPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.params.key;

    const result = await PostServices.searchGloballyOnPostService(key);
    res.send({
      status: "success",
      data: result,
    });
    console.log(`Post ${result.length} is responsed!`);
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

      const result = await PostServices.addNewPostService({
        ...req.body,
        postBy: { ...postBy?.toObject(), moreAboutUser: postBy?._id },
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

// get all Posts
export const getAllPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostServices.getAllPosts(req.query);
    res.send({
      status: "success",
      data: result,
    });
    console.log(`${result.length} Posts are responsed!`);
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
    const result = await PostServices.getAllActivePosts(req.query);
    res.send({
      status: "success",
      data: result,
    });
    console.log(`${result.length} Posts are responsed!`);
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

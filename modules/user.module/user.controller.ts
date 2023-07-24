import { NextFunction, Request, Response } from "express";
import * as userServices from "./user.services";
import { generate_token } from "../../utils/generate_token";
import { Types } from "mongoose";
import { getStoreByIdService } from "../store.module/store.services";
import { getPostByIdService } from "../post.module/post.services";
// signup controller
export const addNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const existUser = await userServices.getUserByEmailService(userData.email);
    if (
      !userData.name ||
      !userData.email ||
      !userData.country ||
      (!userData.provider?.name && !userData.password)
    ) {
      throw new Error("Please enter required information!");
    } else if (
      existUser?.isVerified ||
      (existUser && !existUser?.isVerified && !userData.provider?.name)
    ) {
      throw new Error("User already exist!");
    } else {
      let token;
      if (userData.password) {
        token = generate_token(userData);
      }
      await userServices.deleteAUserByEmailService(existUser?.email || "");
      const user = await userServices.addNewUserService(userData);

      res.send({
        status: "success",
        data: { user, token },
      });
      console.log(`user ${user.email} sign up!`);
    }
  } catch (error) {
    next(error);
  }
};

// login controller
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getUserByEmailService(email);
    if (!user) {
      throw new Error("User not found, Please 'sign up' first!");
    } else {
      let token;
      // check password or provider exist
      if (password) {
        const isPasswordMatched = await userServices.comparePassword(
          email,
          password
        );
        if (isPasswordMatched) {
          token = generate_token(user);
        } else {
          throw new Error("Incorrect email or password!");
        }
      } else if (!user.provider?.name) {
        throw new Error("Please provide a valid credential!");
      }

      res.send({
        status: "success",
        data: { user, token },
      });
      console.log(`user ${user.email} is responsed!`);
    }
  } catch (error) {
    next(error);
  }
};
// verify a user by user token
export const verifyAUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;
    const user = await userServices.getUserByEmailService(email);
    if (!user) {
      throw new Error("User not found!");
    } else if (user.isVerified) {
      throw new Error("User already verified!");
    } else {
      const result = await userServices.verifyAUserService(user._id);

      res.send({
        status: "success",
        data: result,
      });
      console.log(result);
    }
  } catch (error) {
    next(error);
  }
};
// about me by token
export const getAboutMeUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.decoded.email;
    const result = await userServices.getUserByEmailService(email);
    if (!result) {
      throw new Error("User not found!");
    } else {
      res.send({
        status: "success",
        data: result,
      });
      console.log(result);
    }
  } catch (error) {
    next(error);
  }
};
// update me from token
export const updateAboutMeUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.body.decoded.email;
    const isUserExist = await userServices.getUserByEmailService(userEmail);

    if (!isUserExist) {
      throw new Error("User not found!");
    }
    const { newPosts, favourite, email, ...rest } = req.body;
    const result = await userServices.updateMeByEmailService(
      isUserExist._id,
      rest
    );
    res.send({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// get all user
export const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getAllUserService(req.query);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`${result?.data?.length} user responsed!`);
  } catch (error) {
    next(error);
  }
};
// get all favourite stores
export const getAllFavouriteStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getFavouriteStoreService(
      req.body.decoded.email
    );
    res.send({
      status: "success",
      result,
    });
    console.log(`${result?._id} favourite stores responsed!`);
  } catch (error) {
    next(error);
  }
};
// get all favourite posts
export const getAllFavouritePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getFavouritePostService(
      req.body.decoded.email
    );
    res.send({
      status: "success",
      result,
    });
    console.log(`${result?._id} favourite posts responsed!`);
  } catch (error) {
    next(error);
  }
};
// get add favourite stores
export const addAndRemoveStoreFromFavouriteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = new Types.ObjectId(req.params.id);
    const isStoreExist = await getStoreByIdService(storeId);
    if (!isStoreExist) {
      throw new Error("Sorry, Store doesn't exist!");
    } else {
      const result = await userServices.addAndRemoveStoreFromFavouriteService(
        req.body.decoded.email,
        storeId
      );
      res.send({
        status: "success",
        result,
      });
      console.log(`Store favourite list modified!`);
    }
  } catch (error) {
    next(error);
  }
};
// get add favourite stores
export const addAndRemovePostFromFavouriteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const PostId = new Types.ObjectId(req.params.id);
    const isPostExist = await getPostByIdService(PostId);
    if (!isPostExist) {
      throw new Error("Sorry, Post doesn't exist!");
    } else {
      const result = await userServices.addAndRemovePostFromFavouriteService(
        req.body.decoded.email,
        PostId
      );
      res.send({
        status: "success",
        result,
      });
      console.log(`Post favourite list modified!`);
    }
  } catch (error) {
    next(error);
  }
};
// get all notification counted
export const getUnreadedNotificationCountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getUnreadedNotificationCountService(
      req.body.decoded.email
    );
    res.send({
      status: "success",
      data: result,
    });
    console.log(`${result} user responsed!`);
  } catch (error) {
    next(error);
  }
};
// get all notifications
export const getNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getNotificationService(
      req.body.decoded.email
    );
    res.send({
      status: "success",
      data: result,
    });
    console.log(`${result?._id} user responsed!`);
  } catch (error) {
    next(error);
  }
};
// set post status to readed
export const setNotificationReadedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const result = await userServices.setNotificationReadedService(
      req.body.decoded.email,
      postId
    );
    res.send({
      status: "success",
      data: result,
    });
    console.log(`notification ${postId} is readed!`);
  } catch (error) {
    next(error);
  }
};
// get all admin and managers
export const getAllAdminAndManagerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.getAllAdminAndManagerService(req.query);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`notification ${result?.data?.length} is readed!`);
  } catch (error) {
    next(error);
  }
};
// add an admin
export const addNewAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const user = (await userServices.getUserByIdService(id)) as any;
    if (!user) {
      throw new Error("User not found!");
    } else if (user.role === "admin") {
      throw new Error("User already admin!");
    } else {
      const result = await userServices.addNewAdminService(id);
      res.send({
        status: "success",
        data: result,
      });
      console.log(`notification ${result} is readed!`);
    }
  } catch (error) {
    next(error);
  }
};
// remove an admin
export const removeAnAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const user = (await userServices.getUserByIdService(id)) as any;

    if (!user) {
      throw new Error("User not found!");
    } else if (user.role !== "admin" && user.role !== "manager") {
      throw new Error("User is not a manager or admin!");
    } else {
      const result = await userServices.removeAnAdminService(id);
      res.send({
        status: "success",
        data: result,
      });
      console.log(`notification ${result} is readed!`);
    }
  } catch (error) {
    next(error);
  }
};
// add a manager
export const addNewManagerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const user = (await userServices.getUserByIdService(id)) as any;
    if (!user) {
      throw new Error("User not found!");
    } else if (user.role === "manager") {
      throw new Error("User already manager!");
    } else {
      const result = await userServices.addNewManagerService(id);
      res.send({
        status: "success",
        data: result,
      });
      console.log(`notification ${result} is readed!`);
    }
  } catch (error) {
    next(error);
  }
};

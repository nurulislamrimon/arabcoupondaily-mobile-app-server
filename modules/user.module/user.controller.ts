import { NextFunction, Request, Response } from "express";
import * as userServices from "./user.services";
import { generate_token } from "../../utils/generate_token";
import { Types } from "mongoose";
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
    const email = req.body.decoded.email;
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
      data: result,
    });
    console.log(`${result.length} user responsed!`);
  } catch (error) {
    next(error);
  }
};
// get all user
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
    console.log(`${result} user responsed!`);
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
      data: result,
    });
    console.log(`notification ${result.length} is readed!`);
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

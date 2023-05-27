import { NextFunction, Request, Response } from "express";
import * as userServices from "./user.services";
import { generate_token } from "../../utils/generate_token";
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
      (!existUser?.isVerified && !userData.provider?.name)
    ) {
      throw new Error("User already exist!");
    } else {
      let token;
      if (userData.password) {
        token = generate_token(userData);
      }
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
    const decoded = req.headers.decoded;
    const email = decoded ? decoded[0] : "";
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

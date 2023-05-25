import { NextFunction, Request, Response } from "express";
import * as userServices from "./user.services";

export const addNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.addNewUserService(req.body);
    res.send({
      status: "success",
      data: result,
    });
    console.log(result);
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { error_code_from_message } from "../utils/error_codes_from_message";
import colors from "@colors/colors";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({
      status: "failed",
      message: "Route doesn't exist!",
    });
    console.log(colors.magenta("Route doesn't exist!"));
  } catch (error) {
    next(error);
  }
};
export const allErrorHandler = (
  err: { message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    throw new Error("Something went wrong!");
  } else {
    if (err) {
      res.status(error_code_from_message(err.message)).send({
        status: "failed",
        message: err.message,
      });
      console.log(colors.red(err.message));
    } else {
      res.send({
        status: "failed",
        message: "Internal server error!",
      });
      console.log(colors.red("Internal server error!"));
    }
  }
};

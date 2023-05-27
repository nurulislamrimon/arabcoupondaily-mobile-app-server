import { NextFunction, Request, Response } from "express";
import colour from "colour";
import { error_code_from_message } from "../utils/error_codes_from_message";

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
    console.log(colour.red("Route doesn't exist!"));
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
      console.log(colour.red(err.message));
    } else {
      res.send({
        status: "failed",
        message: "Internal server error!",
      });
      console.log(colour.red("Internal server error!"));
    }
  }
};

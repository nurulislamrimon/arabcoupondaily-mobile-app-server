import { NextFunction, Request, Response } from "express";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({
    status: "failed",
    message: "Route doesn't exist!",
  });
  console.log("Route doesn't exist!");
};
export const allErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({
    status: "failed",
    message: err.message,
  });
  console.log(err.message);
};

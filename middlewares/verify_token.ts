import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify_token = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error("Access Forbidden!");
  } else {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secret_key);

    if (!decoded) {
      throw new Error("Unauthorized access!");
    } else {
      req.headers.decoded = [decoded.email];
      next();
    }
  }
};

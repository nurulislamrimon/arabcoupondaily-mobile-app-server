import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmailService } from "../modules/user.module/user.services";

export const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    interface IPayload {
      email: string;
    }
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new Error("Access Forbidden!");
    } else {
      const token = authorization.split(" ")[1];

      const secret = process.env.secret_key || "";
      const payload = jwt.verify(token, secret) as IPayload;

      const email = payload.email;
      const user = await getUserByEmailService(email as string);
      if (!user?.isVerified) {
        throw new Error("Unauthorized access!");
      } else {
        req.body.decoded = payload;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

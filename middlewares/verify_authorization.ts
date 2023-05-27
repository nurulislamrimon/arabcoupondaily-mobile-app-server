import { NextFunction, Request } from "express";
import { getUserByEmailService } from "../modules/user.module/user.services";

export const verify_authorization = (roles: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body.decoded.email;
      const user = await getUserByEmailService(email);
      console.log(user);
      next();
    } catch (error) {
      next(error);
    }
  };
};

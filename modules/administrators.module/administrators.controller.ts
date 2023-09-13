import { NextFunction, Request, Response } from "express";
import * as administratorsServices from "./administrators.services";

export const addNewAdministratorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existAdministrator =
      await administratorsServices.getAdministratorsByEmailService(email);
    if (existAdministrator) {
      throw new Error("Administrator already exist!");
    }
    const newAdministrator =
      await administratorsServices.addNewAdministratorsService(req.body);

    res.send({
      status: "success",
      data: newAdministrator,
    });
    console.log(`user ${newAdministrator._id} is responsed!`);
  } catch (error) {
    next(error);
  }
};

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

// ================get =============== === === ===

// // get all admin and managers
export const getAllAdminAndManagerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await administratorsServices.getAllAdminAndManagerService(
      req.query
    );
    res.send({
      status: "success",
      ...result,
    });
    console.log(`Administrators ${result?.data?.length} are responsed!`);
  } catch (error) {
    next(error);
  }
};
// // add an admin
// export const addNewAdminController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = new Types.ObjectId(req.params.id);
//     const user = (await userServices.getUserByIdService(id)) as any;
//     if (!user) {
//       throw new Error("User not found!");
//     } else if (user.role === "admin") {
//       throw new Error("User already admin!");
//     } else {
//       const result = await userServices.addNewAdminService(id);
//       res.send({
//         status: "success",
//         data: result,
//       });
//       console.log(`notification ${result} is readed!`);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// // remove an admin
// export const removeAnAdminController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = new Types.ObjectId(req.params.id);
//     const user = (await userServices.getUserByIdService(id)) as any;

//     if (!user) {
//       throw new Error("User not found!");
//     } else if (user.role !== "admin" && user.role !== "manager") {
//       throw new Error("User is not a manager or admin!");
//     } else {
//       const result = await userServices.removeAnAdminService(id);
//       res.send({
//         status: "success",
//         data: result,
//       });
//       console.log(`notification ${result} is readed!`);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// // add a manager
// export const addNewManagerController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = new Types.ObjectId(req.params.id);
//     const user = (await userServices.getUserByIdService(id)) as any;
//     if (!user) {
//       throw new Error("User not found!");
//     } else if (user.role === "manager") {
//       throw new Error("User already manager!");
//     } else {
//       const result = await userServices.addNewManagerService(id);
//       res.send({
//         status: "success",
//         data: result,
//       });
//       console.log(`notification ${result} is readed!`);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

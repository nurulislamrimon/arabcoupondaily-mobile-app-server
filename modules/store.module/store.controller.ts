import { NextFunction, Request, Response } from "express";
import * as storeServices from "./store.services";

// signup controller
export const addNewStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoURL, storeName, country, storeExternalLink } = req.body;
    const existStore = await storeServices.getStoreByNameService(storeName);

    if (!photoURL || !storeName || !country || !storeExternalLink) {
      throw new Error("Please enter required information!");
    } else if (existStore?.storeName === storeName) {
      throw new Error("Store already exist!");
    } else {
      const result = await storeServices.addNewStoreService(req.body);
      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result.storeName} is added!`);
    }
  } catch (error) {
    next(error);
  }
};

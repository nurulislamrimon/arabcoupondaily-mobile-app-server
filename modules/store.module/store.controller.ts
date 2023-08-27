import { NextFunction, Request, Response } from "express";
import * as storeServices from "./store.services";
import { getUserByEmailService } from "../user.module/user.services";
import { Types } from "mongoose";

// get all active stores
export const getAllActiveStoresController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await storeServices.getAllActiveStores(req.query);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`${result?.data?.length} stores are responsed!`);
  } catch (error) {
    next(error);
  }
};
// add new store controller
export const getAStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = new Types.ObjectId(req.params.id);

    const result = await storeServices.getStoreByIdService(storeId);
    if (!result) {
      throw new Error("Post not found!");
    } else {
      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result._id} is added!`);
    }
  } catch (error) {
    next(error);
  }
};
// add new store controller
export const addNewStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoURL, storeName, country, storeExternalLink } = req.body;
    const existStore = await storeServices.getStoreByStoreNameService(
      storeName
    );

    if (!photoURL || !storeName || !country || !storeExternalLink) {
      throw new Error("Please enter required information!");
    } else if (existStore?.storeName === storeName) {
      throw new Error("Store already exist!");
    } else {
      const postBy = await getUserByEmailService(req.body.decoded.email);

      const result = await storeServices.addNewStoreService({
        ...req.body,
        postBy: { ...postBy?.toObject(), moreAboutUser: postBy?._id },
      });
      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};
// get all stores
export const getAllStoresController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await storeServices.getAllStores(req.query);
    res.send({
      status: "success",
      ...result,
    });
    console.log(`${result?.data?.length} stores are responsed!`);
  } catch (error) {
    next(error);
  }
};
// update a store controller
export const updateAStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const existStore = await storeServices.getStoreByIdService(postId);

    if (!existStore) {
      throw new Error("Store doesn't exist!");
    } else {
      const updateBy = await getUserByEmailService(req.body.decoded.email);
      const result = await storeServices.updateAStoreService(postId, {
        ...req.body,
        existStore,
        updateBy: { ...updateBy?.toObject(), moreAboutUser: updateBy?._id },
      });

      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};
// update a store controller
export const deleteAStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = new Types.ObjectId(req.params.id);
    const existStore = await storeServices.getStoreByIdService(postId);

    if (!existStore) {
      throw new Error("Store doesn't exist!");
    } else {
      const result = await storeServices.deleteAStoreService(postId);

      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result} is added!`);
    }
  } catch (error) {
    next(error);
  }
};

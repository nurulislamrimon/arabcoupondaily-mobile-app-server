import express from "express";
import * as storeController from "./store.controller";
import { verify_token } from "../../middlewares/verify_token";
import { verify_authorization } from "../../middlewares/verify_authorization";

const storeRouter = express.Router();

/**
 *@api{post}/add add new store
 *@apiDescription add a new store
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody photoURL, storeName, country,storeExternalLink, description, howToUse
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} added store.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.post(
  "/add",
  verify_token,
  verify_authorization("admin", "manager") as any,
  storeController.addNewStoreController
);

/**
 *@api{get}/ get all store
 *@apiDescription get all stores
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam none
 *@apiQuery query{name & others Properties},limit,sort,page
 *@apiSuccess {Array of Object} all stores.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.get(
  "/",
  verify_token,
  verify_authorization("admin", "manager") as any,
  storeController.getAllStoresController
);
/**
 *@api{put}/:id update a store
 *@apiDescription update a store by id with validation
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam ObjectId of store
 *@apiQuery none
 *@apiSuccess {Object} update info of the store.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.put(
  "/:id",
  verify_token,
  verify_authorization("admin", "manager") as any,
  storeController.updateAStoreController
);

export default storeRouter;

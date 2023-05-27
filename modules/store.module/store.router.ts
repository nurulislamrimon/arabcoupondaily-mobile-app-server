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

export default storeRouter;

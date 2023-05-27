import express from "express";
import * as storeController from "./store.controller";
import { verify_token } from "../../middlewares/verify_token";

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
storeRouter.post("/add", storeController.addNewStoreController);

// /**
//  *@api{post}/login login an existing Store
//  *@apiDescription login with password or provider
//  *@apiPermission none
//  *@apiHeader none
//  *@apiBody email, (password,confirmPassword||provider)
//  *@apiParam none
//  *@apiQuery none
//  *@apiSuccess {Object} if password then Store info and token else only Store info.
//  *@apiError Store not found, Please signup first!
//  *@apiError email or password incorrect!
//  */
// storeRouter.post("/login", StoreController.loginStoreController);

// /**
//  *@api{put}/verify verify a Store
//  *@apiDescription verify a Store by Store token
//  *@apiPermission none
//  *@apiHeader access token with bearer
//  *@apiBody none
//  *@apiParam none
//  *@apiQuery none
//  *@apiSuccess {Object} update status.
//  *@apiError Store not found!
//  *@apiError Store already verified!
//  */
// storeRouter.put(
//   "/verify",
//   verify_token,
//   StoreController.verifyAStoreController
// );

export default storeRouter;

import express from "express";
import * as userController from "./user.controller";
import { verify_token } from "../../middlewares/verify_token";
import { verify_authorization } from "../../middlewares/verify_authorization";

const userRouter = express.Router();

/**
 *@api{post}/signup signup a new user
 *@apiDescription signup using password or provider
 *@apiPermission none
 *@apiHeader none
 *@apiBody name,email,country, (password,confirmPassword||provider)
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} if password then user info and token else only user info.
 *@apiError user already exist!
 *@apiError password not found!
 */
userRouter.post("/signup", userController.addNewUserController);

/**
 *@api{post}/login login an existing user
 *@apiDescription login with password or provider
 *@apiPermission none
 *@apiHeader none
 *@apiBody email, (password,confirmPassword||provider)
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} if password then user info and token else only user info.
 *@apiError user not found, Please signup first!
 *@apiError email or password incorrect!
 */
userRouter.post("/login", userController.loginUserController);

/**
 *@api{put}/verify verify a user
 *@apiDescription verify a user by user token
 *@apiPermission none
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} update status.
 *@apiError user not found!
 *@apiError user already verified!
 */
userRouter.put("/verify", verify_token, userController.verifyAUserController);
/**
 *@api{get}/me about a user
 *@apiDescription get information about a user by itself
 *@apiPermission none
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} aobut me
 *@apiError user not found!
 */
userRouter.get("/me", verify_token, userController.getAboutMeUserController);
/**
 *@api{get}/ get all user
 *@apiDescription get all users
 *@apiPermission admin and manager
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}, limit, skip, sort
 *@apiSuccess {Array of Object} about users
 *@apiError 401 & 403
 */
userRouter.get(
  "/",
  verify_token,
  verify_authorization("admin", "manager") as any,
  userController.getAllUserController
);

export default userRouter;

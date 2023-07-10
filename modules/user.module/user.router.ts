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
 *@api{put}/verify/:email verify a user
 *@apiDescription verify a user email
 *@apiPermission none
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} update status.
 *@apiError user not found!
 *@apiError user already verified!
 */
userRouter.put("/verify/:email", userController.verifyAUserController);
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

// ===================================================
// === =============Favourite============= ===
// ===================================================
/**
 *@api{get}/favourite/store get favourite stores
 *@apiDescription get all favourite stores with counted
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}
 *@apiSuccess {Array of Object} all favourite stores
 *@apiError 401 & 403
 */
userRouter.get(
  "/favourite/store",
  verify_token,
  userController.getAllFavouriteStoreController
);
/**
 *@api{get}/favourite/post get favourite posts
 *@apiDescription get all favourite posts with counted
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}
 *@apiSuccess {Array of Object} all favourite posts
 *@apiError 401 & 403
 */
userRouter.get(
  "/favourite/post",
  verify_token,
  userController.getAllFavouritePostController
);
/**
 *@api{put}/favourite/store/:id add and remove store from the favourite list.
 *@apiDescription add and remove store from the favourite list.
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} favourite stores
 *@apiError 401 & 403
 */
userRouter.put(
  "/favourite/store/:id",
  verify_token,
  userController.addAndRemoveStoreFromFavouriteController
);
/**
 *@api{put}/favourite/post/:id add and remove Post from the favourite list.
 *@apiDescription add and remove Post from the favourite list.
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} favourite Posts
 *@apiError 401 & 403
 */
userRouter.put(
  "/favourite/post/:id",
  verify_token,
  userController.addAndRemovePostFromFavouriteController
);

// ===================================================
// === =============notification============= ===
// ===================================================
/**
 *@api{get}/notification get notification
 *@apiDescription get all new posts counted
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}
 *@apiSuccess {Array of Object} about all posts
 *@apiError 401 & 403
 */
userRouter.get(
  "/notification",
  verify_token,
  userController.getUnreadedNotificationCountController
);
/**
 *@api{get}/notification get notification
 *@apiDescription get all new posts with all information
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}
 *@apiSuccess {Array of Object} about all posts
 *@apiError 401 & 403
 */
userRouter.get(
  "/notification/all",
  verify_token,
  userController.getNotificationController
);
/**
 *@api{put}/notification/readed/:id update a post notification status
 *@apiDescription set notification post status to readed
 *@apiPermission user
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery {filters}
 *@apiSuccess {Array of Object} about all posts
 *@apiError 401 & 403
 */
userRouter.put(
  "/notification/readed/:id",
  verify_token,
  userController.setNotificationReadedController
);
// ===================================================
// === =================admin==================== ===
// ===================================================
/**
 *@api{get}/admin get all admin and managers
 *@apiDescription get all admin and managers
 *@apiPermission admin
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Array of Object} get all admin and manager object
 *@apiError 401 & 403
 */
userRouter.get(
  "/admin",
  verify_token,
  verify_authorization("admin", "manager") as any,
  userController.getAllAdminAndManagerController
);
/**
 *@api{put}/admin/add/:id add new admin
 *@apiDescription add a admin by using user ObjectId
 *@apiPermission admin
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam ObjectId
 *@apiQuery none
 *@apiSuccess {Object} update info
 *@apiError 401 & 403
 */
userRouter.put(
  "/admin/add/:id",
  verify_token,
  verify_authorization("admin") as any,
  userController.addNewAdminController
);
/**
 *@api{put}/admin/remove/:id remove an admin
 *@apiDescription remove and admin by using user ObjectId
 *@apiPermission admin
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam ObjectId
 *@apiQuery none
 *@apiSuccess {Object} update info
 *@apiError 401 & 403
 */
userRouter.put(
  "/admin/remove/:id",
  verify_token,
  verify_authorization("admin") as any,
  userController.removeAnAdminController
);
/**
 *@api{put}/manager/add/:id add an manager
 *@apiDescription add a manager by using user ObjectId
 *@apiPermission admin
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam ObjectId
 *@apiQuery none
 *@apiSuccess {Object} update info
 *@apiError 401 & 403
 */
userRouter.put(
  "/manager/add/:id",
  verify_token,
  verify_authorization("admin") as any,
  userController.addNewManagerController
);

export default userRouter;

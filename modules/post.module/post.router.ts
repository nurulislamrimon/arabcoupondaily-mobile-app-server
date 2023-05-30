import express from "express";
import * as PostController from "./post.controller";
import { verify_token } from "../../middlewares/verify_token";
import { verify_authorization } from "../../middlewares/verify_authorization";

const postRouter = express.Router();

/**
 *@api{post}/add add new Post
 *@apiDescription add a new Post
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody postTitle, storeName, postType, expireDate, country, isVerified, couponCode, externalLink, postDescription,
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} added Post.
 *@apiError 401, 403 unauthorized & forbidden
 */
postRouter.post(
  "/add",
  verify_token,
  verify_authorization("admin", "manager") as any,
  PostController.addNewPostController
);

/**
 *@api{get}/ get all Post
 *@apiDescription get all Posts
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam none
 *@apiQuery query{name & others Properties},limit,sort,page
 *@apiSuccess {Array of Object} all Posts.
 *@apiError 401, 403 unauthorized & forbidden
 */
postRouter.get(
  "/",
  verify_token,
  verify_authorization("admin", "manager") as any,
  PostController.getAllPostsController
);
/**
 *@api{put}/:id update a Post
 *@apiDescription update a Post by id with validation
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam ObjectId of Post
 *@apiQuery none
 *@apiSuccess {Object} update info of the Post.
 *@apiError 401, 403 unauthorized & forbidden
 */
postRouter.put(
  "/:id",
  verify_token,
  verify_authorization("admin", "manager") as any,
  PostController.updateAPostController
);
/**
 *@api{delete}/:id delete a Post
 *@apiDescription delete a Post by id
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam ObjectId of Post
 *@apiQuery none
 *@apiSuccess {Object} delete confirmation.
 *@apiError 401, 403 unauthorized & forbidden
 */
postRouter.delete(
  "/:id",
  verify_token,
  verify_authorization("admin", "manager") as any,
  PostController.deleteAPostController
);

export default postRouter;
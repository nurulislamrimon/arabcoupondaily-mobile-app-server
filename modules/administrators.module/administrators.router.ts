import express from "express";
import * as AdministratorController from "./administrators.controller";
import { verify_token } from "../../middlewares/verify_token";
import { verify_authorization } from "../../middlewares/verify_authorization";
import { roles } from "../../utils/constants/authorization_roles";

const administratorRouter = express.Router();

// ===================================================
// === =================admin==================== ===
// ===================================================
/**
 *@api{post}/add  add new administrator
 *@apiDescription add an administrator
 *@apiPermission admin & super admin only
 *@apiHeader accessToken
 *@apiBody email, role
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} email and role
 *@apiError Administrator already exist
 *@apiError 404,401
 */
administratorRouter.post(
  "/add",
  verify_token,
  verify_authorization(roles.SUPER_ADMIN, roles.ADMIN) as any,
  AdministratorController.addNewAdministratorController
);

/**
 *@api{get}/ get all admin and managers
 *@apiDescription get all admin and managers
 *@apiPermission super admin, admin & manager
 *@apiHeader access token with bearer
 *@apiBody none
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Array of Object} get all admin and manager object
 *@apiError 401 & 403
 */
administratorRouter.get(
  "/",
  verify_token,
  verify_authorization(roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER) as any,
  AdministratorController.getAllAdminAndManagerController
);

// /**
//  *@api{put}/admin/add/:id add new admin
//  *@apiDescription add a admin by using user ObjectId
//  *@apiPermission admin
//  *@apiHeader access token with bearer
//  *@apiBody none
//  *@apiParam ObjectId
//  *@apiQuery none
//  *@apiSuccess {Object} update info
//  *@apiError 401 & 403
//  */
// userRouter.put(
//   "/admin/add/:id",
//   verify_token,
//   verify_authorization(roles.SUPER_ADMIN,roles.ADMIN) as any,
//   userController.addNewAdminController
// );
// /**
//  *@api{put}/admin/remove/:id remove an admin
//  *@apiDescription remove and admin by using user ObjectId
//  *@apiPermission admin
//  *@apiHeader access token with bearer
//  *@apiBody none
//  *@apiParam ObjectId
//  *@apiQuery none
//  *@apiSuccess {Object} update info
//  *@apiError 401 & 403
//  */
// userRouter.put(
//   "/admin/remove/:id",
//   verify_token,
//   verify_authorization(roles.SUPER_ADMIN,roles.ADMIN) as any,
//   userController.removeAnAdminController
// );
// /**
//  *@api{put}/manager/add/:id add an manager
//  *@apiDescription add a manager by using user ObjectId
//  *@apiPermission admin
//  *@apiHeader access token with bearer
//  *@apiBody none
//  *@apiParam ObjectId
//  *@apiQuery none
//  *@apiSuccess {Object} update info
//  *@apiError 401 & 403
//  */
// userRouter.put(
//   "/manager/add/:id",
//   verify_token,
//   verify_authorization(roles.SUPER_ADMIN,roles.ADMIN) as any,
//   userController.addNewManagerController
// );

export default administratorRouter;

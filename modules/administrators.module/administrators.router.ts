import express from "express";
import * as AdministratorController from "./administrators.controller";
import { verify_token } from "../../middlewares/verify_token";
import { verify_authorization } from "../../middlewares/verify_authorization";
import { roles } from "../../utils/constants/authorization_roles.js";

const administratorRouter = express.Router();

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

export default administratorRouter;

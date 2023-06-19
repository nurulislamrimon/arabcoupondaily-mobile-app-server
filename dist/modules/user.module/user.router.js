"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("./user.controller"));
const verify_token_1 = require("../../middlewares/verify_token");
const verify_authorization_1 = require("../../middlewares/verify_authorization");
const userRouter = express_1.default.Router();
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
userRouter.get("/me", verify_token_1.verify_token, userController.getAboutMeUserController);
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
userRouter.get("/", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), userController.getAllUserController);
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
userRouter.get("/notification", verify_token_1.verify_token, userController.getNotificationController);
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
userRouter.put("/notification/readed/:id", verify_token_1.verify_token, userController.setNotificationReadedController);
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
userRouter.get("/admin", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), userController.getAllAdminAndManagerController);
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
userRouter.put("/admin/add/:id", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin"), userController.addNewAdminController);
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
userRouter.put("/admin/remove/:id", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin"), userController.removeAnAdminController);
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
userRouter.put("/manager/add/:id", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin"), userController.addNewManagerController);
exports.default = userRouter;

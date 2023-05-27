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
userRouter.put("/verify", verify_token_1.verify_token, userController.verifyAUserController);
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
exports.default = userRouter;

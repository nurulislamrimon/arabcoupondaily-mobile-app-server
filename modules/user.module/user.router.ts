import express from "express";
import * as userController from "./user.controller";

const userRouter = express.Router();

userRouter.post("/signup", userController.addNewUserController);

export default userRouter;

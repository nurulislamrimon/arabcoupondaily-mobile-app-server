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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewManagerController = exports.removeAnAdminController = exports.addNewAdminController = exports.getAllAdminAndManagerController = exports.setNotificationReadedController = exports.getNotificationController = exports.getUnreadedNotificationCountController = exports.getAllUserController = exports.getAboutMeUserController = exports.verifyAUserController = exports.loginUserController = exports.addNewUserController = void 0;
const userServices = __importStar(require("./user.services"));
const generate_token_1 = require("../../utils/generate_token");
const mongoose_1 = require("mongoose");
// signup controller
const addNewUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userData = req.body;
        const existUser = yield userServices.getUserByEmailService(userData.email);
        if (!userData.name ||
            !userData.email ||
            !userData.country ||
            (!((_a = userData.provider) === null || _a === void 0 ? void 0 : _a.name) && !userData.password)) {
            throw new Error("Please enter required information!");
        }
        else if ((existUser === null || existUser === void 0 ? void 0 : existUser.isVerified) ||
            (existUser && !(existUser === null || existUser === void 0 ? void 0 : existUser.isVerified) && !((_b = userData.provider) === null || _b === void 0 ? void 0 : _b.name))) {
            throw new Error("User already exist!");
        }
        else {
            let token;
            if (userData.password) {
                token = (0, generate_token_1.generate_token)(userData);
            }
            yield userServices.deleteAUserByEmailService((existUser === null || existUser === void 0 ? void 0 : existUser.email) || "");
            const user = yield userServices.addNewUserService(userData);
            res.send({
                status: "success",
                data: { user, token },
            });
            console.log(`user ${user.email} sign up!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addNewUserController = addNewUserController;
// login controller
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { email, password } = req.body;
        const user = yield userServices.getUserByEmailService(email);
        if (!user) {
            throw new Error("User not found, Please 'sign up' first!");
        }
        else {
            let token;
            // check password or provider exist
            if (password) {
                const isPasswordMatched = yield userServices.comparePassword(email, password);
                if (isPasswordMatched) {
                    token = (0, generate_token_1.generate_token)(user);
                }
                else {
                    throw new Error("Incorrect email or password!");
                }
            }
            else if (!((_c = user.provider) === null || _c === void 0 ? void 0 : _c.name)) {
                throw new Error("Please provide a valid credential!");
            }
            res.send({
                status: "success",
                data: { user, token },
            });
            console.log(`user ${user.email} is responsed!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserController = loginUserController;
// verify a user by user token
const verifyAUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const user = yield userServices.getUserByEmailService(email);
        if (!user) {
            throw new Error("User not found!");
        }
        else if (user.isVerified) {
            throw new Error("User already verified!");
        }
        else {
            const result = yield userServices.verifyAUserService(user._id);
            res.send({
                status: "success",
                data: result,
            });
            console.log(result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAUserController = verifyAUserController;
// about me by token
const getAboutMeUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.decoded.email;
        const result = yield userServices.getUserByEmailService(email);
        if (!result) {
            throw new Error("User not found!");
        }
        else {
            res.send({
                status: "success",
                data: result,
            });
            console.log(result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAboutMeUserController = getAboutMeUserController;
// get all user
const getAllUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices.getAllUserService(req.query);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`${result.length} user responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserController = getAllUserController;
// get all notification counted
const getUnreadedNotificationCountController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices.getUnreadedNotificationCountService(req.body.decoded.email);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`${result} user responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getUnreadedNotificationCountController = getUnreadedNotificationCountController;
// get all notifications
const getNotificationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices.getNotificationService(req.body.decoded.email);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`${result === null || result === void 0 ? void 0 : result._id} user responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotificationController = getNotificationController;
// set post status to readed
const setNotificationReadedController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = new mongoose_1.Types.ObjectId(req.params.id);
        const result = yield userServices.setNotificationReadedService(req.body.decoded.email, postId);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`notification ${postId} is readed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.setNotificationReadedController = setNotificationReadedController;
// get all admin and managers
const getAllAdminAndManagerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices.getAllAdminAndManagerService(req.query);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`notification ${result.length} is readed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAdminAndManagerController = getAllAdminAndManagerController;
// add an admin
const addNewAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongoose_1.Types.ObjectId(req.params.id);
        const user = (yield userServices.getUserByIdService(id));
        if (!user) {
            throw new Error("User not found!");
        }
        else if (user.role === "admin") {
            throw new Error("User already admin!");
        }
        else {
            const result = yield userServices.addNewAdminService(id);
            res.send({
                status: "success",
                data: result,
            });
            console.log(`notification ${result} is readed!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addNewAdminController = addNewAdminController;
// remove an admin
const removeAnAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongoose_1.Types.ObjectId(req.params.id);
        const user = (yield userServices.getUserByIdService(id));
        if (!user) {
            throw new Error("User not found!");
        }
        else if (user.role !== "admin" && user.role !== "manager") {
            throw new Error("User is not a manager or admin!");
        }
        else {
            const result = yield userServices.removeAnAdminService(id);
            res.send({
                status: "success",
                data: result,
            });
            console.log(`notification ${result} is readed!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.removeAnAdminController = removeAnAdminController;
// add a manager
const addNewManagerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongoose_1.Types.ObjectId(req.params.id);
        const user = (yield userServices.getUserByIdService(id));
        if (!user) {
            throw new Error("User not found!");
        }
        else if (user.role === "manager") {
            throw new Error("User already manager!");
        }
        else {
            const result = yield userServices.addNewManagerService(id);
            res.send({
                status: "success",
                data: result,
            });
            console.log(`notification ${result} is readed!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addNewManagerController = addNewManagerController;

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
exports.deleteAPostController = exports.revealedAPostController = exports.updateAPostController = exports.getAllActivePostsController = exports.getAllPostsController = exports.addNewPostController = exports.searchGloballyOnPostController = void 0;
const PostServices = __importStar(require("./post.services"));
const user_services_1 = require("../user.module/user.services");
const mongoose_1 = require("mongoose");
// add new Post controller
const searchGloballyOnPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.params.key;
        const result = yield PostServices.searchGloballyOnPostService(key);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`Post ${result.length} is responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.searchGloballyOnPostController = searchGloballyOnPostController;
// add new Post controller
const addNewPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postTitle, storeName, expireDate, country } = req.body;
        if (!postTitle || !storeName || !expireDate || !country) {
            throw new Error("Please enter required information!");
        }
        else {
            const postBy = yield (0, user_services_1.getUserByEmailService)(req.body.decoded.email);
            const result = yield PostServices.addNewPostService(Object.assign(Object.assign({}, req.body), { postBy: Object.assign(Object.assign({}, postBy === null || postBy === void 0 ? void 0 : postBy.toObject()), { moreAboutUser: postBy === null || postBy === void 0 ? void 0 : postBy._id }) }));
            res.send({
                status: "success",
                data: result,
            });
            console.log(`Post ${result} is added!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addNewPostController = addNewPostController;
// get all Posts
const getAllPostsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield PostServices.getAllPosts(req.query);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`${result.length} Posts are responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPostsController = getAllPostsController;
// get all active Posts
const getAllActivePostsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield PostServices.getAllActivePosts(req.query);
        res.send({
            status: "success",
            data: result,
        });
        console.log(`${result.length} Posts are responsed!`);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllActivePostsController = getAllActivePostsController;
// update a Post controller
const updateAPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = new mongoose_1.Types.ObjectId(req.params.id);
        const existPost = yield PostServices.getPostByIdService(postId);
        if (!existPost) {
            throw new Error("Post doesn't exist!");
        }
        else {
            const updateBy = yield (0, user_services_1.getUserByEmailService)(req.body.decoded.email);
            const result = yield PostServices.updateAPostService(postId, Object.assign(Object.assign({}, req.body), { existPost, updateBy: Object.assign(Object.assign({}, updateBy === null || updateBy === void 0 ? void 0 : updateBy.toObject()), { moreAboutUser: updateBy === null || updateBy === void 0 ? void 0 : updateBy._id }) }));
            res.send({
                status: "success",
                data: result,
            });
            console.log(`Post ${result} is added!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateAPostController = updateAPostController;
// revealed a Post controller
const revealedAPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = new mongoose_1.Types.ObjectId(req.params.id);
        const existPost = yield PostServices.getPostByIdService(postId);
        if (!existPost) {
            throw new Error("Post doesn't exist!");
        }
        else {
            const result = yield PostServices.revealedAPostService(postId);
            res.send({
                status: "success",
                data: result,
            });
            console.log(`Post ${result} is added!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.revealedAPostController = revealedAPostController;
// update a Post controller
const deleteAPostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = new mongoose_1.Types.ObjectId(req.params.id);
        const existPost = yield PostServices.getPostByIdService(postId);
        if (!existPost) {
            throw new Error("Post doesn't exist!");
        }
        else {
            const result = yield PostServices.deleteAPostService(postId);
            res.send({
                status: "success",
                data: result,
            });
            console.log(`Post ${result} is added!`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAPostController = deleteAPostController;

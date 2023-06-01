"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAPostService = exports.getAllPosts = exports.getAllActivePosts = exports.revealedAPostService = exports.updateAPostService = exports.setPostAsUnreadToUserService = exports.addNewPostService = exports.getPostByIdService = exports.getPostByPostTitleService = void 0;
const add_filters_operator_1 = require("../../utils/add_filters_operator");
const post_model_1 = __importDefault(require("./post.model"));
const user_model_1 = __importDefault(require("../user.module/user.model"));
//== get Post by name
const getPostByPostTitleService = (postTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.default.findOne({ postTitle: postTitle });
    return result;
});
exports.getPostByPostTitleService = getPostByPostTitleService;
//== get Post by objectId
const getPostByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.default.findOne({ _id: id });
    return result;
});
exports.getPostByIdService = getPostByIdService;
//== create new Post
const addNewPostService = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.default.create(post);
    yield (0, exports.setPostAsUnreadToUserService)(result._id);
    return result;
});
exports.addNewPostService = addNewPostService;
//== add post as unread to all verified users
const setPostAsUnreadToUserService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateMany({ isVerified: true }, { $push: { newPosts: { moreAboutPost: postId } } });
    return result;
});
exports.setPostAsUnreadToUserService = setPostAsUnreadToUserService;
//== update a Post
const updateAPostService = (PostId, newData) => __awaiter(void 0, void 0, void 0, function* () {
    // add updator info
    let { updateBy, existPost } = newData, updateData = __rest(newData, ["updateBy", "existPost"]);
    updateBy = Object.assign(Object.assign({}, existPost.updateBy), updateBy);
    const result = yield post_model_1.default.updateOne({ _id: PostId }, { $set: updateData, $push: { updateBy: updateBy } }, { runValidators: true, upsert: true });
    return result;
});
exports.updateAPostService = updateAPostService;
//== update a Post
const revealedAPostService = (PostId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.default.updateOne({ _id: PostId }, { $inc: { revealed: 1 } });
    return result;
});
exports.revealedAPostService = revealedAPostService;
// get all active Posts
const getAllActivePosts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, sort } = query, filters = __rest(query, ["limit", "page", "sort"]);
    const filtersWithOperator = (0, add_filters_operator_1.addFiltersSymbolToOperators)(filters);
    const filtersWithExpireDate = Object.assign({ expireDate: { $lt: new Date() } }, filtersWithOperator);
    const result = yield post_model_1.default.find(filtersWithExpireDate)
        .sort(sort)
        .skip(page * limit)
        .limit(limit);
    return result;
});
exports.getAllActivePosts = getAllActivePosts;
// get all Posts
const getAllPosts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, sort } = query, filters = __rest(query, ["limit", "page", "sort"]);
    const filtersWithOperator = (0, add_filters_operator_1.addFiltersSymbolToOperators)(filters);
    const result = yield post_model_1.default.find(filtersWithOperator)
        .sort(sort)
        .skip(page * limit)
        .limit(limit);
    return result;
});
exports.getAllPosts = getAllPosts;
//== delete a Post
const deleteAPostService = (PostId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.default.deleteOne({ _id: PostId });
    return result;
});
exports.deleteAPostService = deleteAPostService;

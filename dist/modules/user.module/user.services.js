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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewManagerService = exports.removeAnAdminService = exports.addNewAdminService = exports.getAllAdminAndManagerService = exports.setNotificationReadedService = exports.getNotificationService = exports.getUnreadedNotificationCountService = exports.verifyAUserService = exports.comparePassword = exports.deleteAUserByEmailService = exports.addAndRemovePostFromFavouriteService = exports.addAndRemoveStoreFromFavouriteService = exports.getFavouritePostService = exports.getFavouriteStoreService = exports.addNewUserService = exports.getUserByIdService = exports.getUserByEmailService = exports.getAllUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const search_filter_and_queries_1 = require("../../utils/search_filter_and_queries");
const constants_1 = require("../../utils/constants");
//== get all users
const getAllUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filters, skip, page, limit, sortBy, sortOrder } = (0, search_filter_and_queries_1.search_filter_and_queries)("user", query, ...constants_1.user_query_fields);
    const result = yield user_model_1.default.find(filters, {
        password: 0,
        newPosts: 0,
    })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
    const totalDocuments = yield user_model_1.default.countDocuments(filters);
    return {
        meta: {
            page,
            limit,
            totalDocuments,
        },
        data: result,
    };
});
exports.getAllUserService = getAllUserService;
//== get user by email address without password
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email }, { password: 0, newPosts: 0 });
    return result;
});
exports.getUserByEmailService = getUserByEmailService;
//== get user by id
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ _id: id }, { password: 0 });
    return result;
});
exports.getUserByIdService = getUserByIdService;
//== create new user
const addNewUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user).then((data) => {
        data.password = undefined;
        return data;
    });
    return result;
});
exports.addNewUserService = addNewUserService;
//== add store to the favourite list
const getFavouriteStoreService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email }, { "favourite.stores": 1, email: 1, name: 1 }).populate({
        path: "favourite.stores",
        options: {
            projection: {
                postBy: 0,
                updateBy: 0,
                howToUse: 0,
            },
        },
    });
    return result;
});
exports.getFavouriteStoreService = getFavouriteStoreService;
//== add post to the favourite list
const getFavouritePostService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email }, { "favourite.posts": 1, email: 1, name: 1 }).populate({
        path: "favourite.posts",
        options: {
            projection: {
                postBy: 0,
                updateBy: 0,
            },
        },
    });
    return result;
});
exports.getFavouritePostService = getFavouritePostService;
//== add store to the favourite list
const addAndRemoveStoreFromFavouriteService = (email, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        return null;
    }
    let updateQuery = {};
    if (user.favourite.stores.includes(id)) {
        updateQuery = { $pull: { "favourite.stores": id } };
    }
    else {
        updateQuery = { $addToSet: { "favourite.stores": id } };
    }
    const result = yield user_model_1.default.updateOne({ email: email }, updateQuery);
    return result;
});
exports.addAndRemoveStoreFromFavouriteService = addAndRemoveStoreFromFavouriteService;
//== add post to the favourite list
const addAndRemovePostFromFavouriteService = (email, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    if (!user) {
        return null;
    }
    let updateQuery = {};
    if (user.favourite.posts.includes(id)) {
        updateQuery = { $pull: { "favourite.posts": id } };
    }
    else {
        updateQuery = { $addToSet: { "favourite.posts": id } };
    }
    const result = yield user_model_1.default.updateOne({ email: email }, updateQuery);
    return result;
});
exports.addAndRemovePostFromFavouriteService = addAndRemovePostFromFavouriteService;
//== delete user
const deleteAUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.deleteOne({ email: email });
    return result;
});
exports.deleteAUserByEmailService = deleteAUserByEmailService;
//== compare password by email and password
const comparePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email }, { password: 1 });
    const isPasswordMatched = yield bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
    return isPasswordMatched;
});
exports.comparePassword = comparePassword;
//== verify a user
const verifyAUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateOne({ _id: id }, {
        $set: {
            isVerified: true,
        },
    });
    return result;
});
exports.verifyAUserService = verifyAUserService;
// =====notification also====
// calculate unreaded post
const getUnreadedNotificationCountService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
        {
            $match: { email: email },
        },
        {
            $unwind: "$newPosts",
        },
        {
            $match: { "newPosts.status": "unreaded" },
        },
        {
            $count: "newPosts",
        },
    ]);
    return result ? result[0] : result;
});
exports.getUnreadedNotificationCountService = getUnreadedNotificationCountService;
//== get notification based on user
const getNotificationService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email }, { newPosts: 1, email: 1, name: 1 }).populate("newPosts.moreAboutPost", { postBy: 0, updateBy: 0 });
    // .select("postBy");
    return result;
});
exports.getNotificationService = getNotificationService;
//== set notification based on user
const setNotificationReadedService = (email, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateOne({
        email: email,
        "newPosts.moreAboutPost": postId,
    }, {
        $set: {
            "newPosts.$.status": "readed",
        },
    }).populate("newPosts.moreAboutPost");
    return result;
});
exports.setNotificationReadedService = setNotificationReadedService;
// =========admin================
// get all admin and manager
const getAllAdminAndManagerService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filters, skip, page, limit, sortBy, sortOrder } = (0, search_filter_and_queries_1.search_filter_and_queries)("user", query, ...constants_1.user_query_fields);
    filters.$and.push({ $or: [{ role: "admin" }, { role: "manager" }] });
    const result = yield user_model_1.default.find(filters, {
        password: 0,
        newPosts: 0,
    })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
    const totalDocuments = yield user_model_1.default.countDocuments(filters);
    return {
        meta: {
            page,
            limit,
            totalDocuments,
        },
        data: result,
    };
});
exports.getAllAdminAndManagerService = getAllAdminAndManagerService;
//== add new admin
const addNewAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $set: {
            role: "admin",
        },
    });
    return result;
});
exports.addNewAdminService = addNewAdminService;
//== remove an admin
const removeAnAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $unset: { role: 1 },
    });
    return result;
});
exports.removeAnAdminService = removeAnAdminService;
//== add new manager
const addNewManagerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.updateOne({
        _id: id,
    }, {
        $set: {
            role: "manager",
        },
    });
    return result;
});
exports.addNewManagerService = addNewManagerService;

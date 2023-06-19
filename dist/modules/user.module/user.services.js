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
exports.addNewManagerService = exports.removeAnAdminService = exports.addNewAdminService = exports.getAllAdminAndManagerService = exports.setNotificationReadedService = exports.getNotificationService = exports.getUnreadedNotificationCountService = exports.verifyAUserService = exports.comparePassword = exports.deleteAUserByEmailService = exports.addNewUserService = exports.getUserByIdService = exports.getUserByEmailService = exports.getAllUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const add_filters_operator_1 = require("../../utils/add_filters_operator");
//== get all users
const getAllUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, sort } = query, filters = __rest(query, ["limit", "page", "sort"]);
    const filtersWithOperator = (0, add_filters_operator_1.addFiltersSymbolToOperators)(filters);
    const result = yield user_model_1.default.find(filtersWithOperator, {
        password: 0,
        newPosts: 0,
    })
        .sort(sort)
        .limit(limit)
        .skip(limit * page);
    return result;
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
    const result = yield user_model_1.default.findOne({ email: email }, { password: 0 }).populate("newPosts.moreAboutPost", { postBy: 0, updateBy: 0 });
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
    const { limit, page, sort } = query, filters = __rest(query, ["limit", "page", "sort"]);
    const filtersWithOperator = (0, add_filters_operator_1.addFiltersSymbolToOperators)(filters);
    const result = yield user_model_1.default.find(Object.assign({ $or: [{ role: "admin" }, { role: "manager" }] }, filtersWithOperator), {
        password: 0,
        newPosts: 0,
    })
        .sort(sort)
        .limit(limit)
        .skip(limit * page);
    return result;
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

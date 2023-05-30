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
exports.verifyAUserService = exports.comparePassword = exports.deleteAUserByEmailService = exports.addNewUserService = exports.getUserByEmailService = exports.getAllUserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//== get all users
const getAllUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find({});
    return result;
});
exports.getAllUserService = getAllUserService;
//== get user by email address without password
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: email }, { password: 0, readedPosts: 0 });
    return result;
});
exports.getUserByEmailService = getUserByEmailService;
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

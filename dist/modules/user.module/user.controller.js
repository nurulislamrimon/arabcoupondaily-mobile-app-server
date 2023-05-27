"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutMeUserController =
  exports.verifyAUserController =
  exports.loginUserController =
  exports.addNewUserController =
    void 0;
const userServices = __importStar(require("./user.services"));
const generate_token_1 = require("../../utils/generate_token");
// signup controller
const addNewUserController = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      const userData = req.body;
      const existUser = yield userServices.getUserByEmailService(
        userData.email
      );
      if (
        !userData.name ||
        !userData.email ||
        !userData.country ||
        (!((_a = userData.provider) === null || _a === void 0
          ? void 0
          : _a.name) &&
          !userData.password)
      ) {
        throw new Error("Please enter required information!");
      } else if (
        existUser === null || existUser === void 0
          ? void 0
          : existUser.isVerified
      ) {
        throw new Error("User already exist!");
      } else {
        let token;
        if (userData.password) {
          token = (0, generate_token_1.generate_token)(userData);
        }
        const user = yield userServices.addNewUserService(userData);
        res.send({
          status: "success",
          data: { user, token },
        });
        console.log(`user ${user.email} sign up!`);
      }
    } catch (error) {
      next(error);
    }
  });
exports.addNewUserController = addNewUserController;
// login controller
const loginUserController = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
      const { email, password } = req.body;
      const user = yield userServices.getUserByEmailService(email);
      if (!user) {
        throw new Error("User not found, Please 'sign up' first!");
      } else {
        let token;
        // check password or provider exist
        if (password) {
          const isPasswordMatched = yield userServices.comparePassword(
            email,
            password
          );
          if (isPasswordMatched) {
            token = (0, generate_token_1.generate_token)(user);
          } else {
            throw new Error("Incorrect email or password!");
          }
        } else if (
          !((_b = user.provider) === null || _b === void 0 ? void 0 : _b.name)
        ) {
          throw new Error("Please provide a valid credential!");
        }
        res.send({
          status: "success",
          data: { user, token },
        });
        console.log(`user ${user.email} is responsed!`);
      }
    } catch (error) {
      next(error);
    }
  });
exports.loginUserController = loginUserController;
// verify a user by user token
const verifyAUserController = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const email = req.body.decoded;
      const user = yield userServices.getUserByEmailService(email);
      if (!user) {
        throw new Error("User not found!");
      } else if (user.isVerified) {
        throw new Error("User already verified!");
      } else {
        const result = yield userServices.verifyAUserService(user._id);
        res.send({
          status: "success",
          data: result,
        });
        console.log(result);
      }
    } catch (error) {
      next(error);
    }
  });
exports.verifyAUserController = verifyAUserController;
// about me by token
const getAboutMeUserController = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const decoded = req.headers.decoded;
      const email = decoded ? decoded[0] : "";
      const result = yield userServices.getUserByEmailService(email);
      if (!result) {
        throw new Error("User not found!");
      } else {
        res.send({
          status: "success",
          data: result,
        });
        console.log(result);
      }
    } catch (error) {
      next(error);
    }
  });
exports.getAboutMeUserController = getAboutMeUserController;

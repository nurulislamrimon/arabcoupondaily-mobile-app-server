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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_authorization = void 0;
const user_services_1 = require("../modules/user.module/user.services");
const verify_authorization = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.body.decoded.email;
            const user = yield (0, user_services_1.getUserByEmailService)(email);
            if (!user) {
                next("Unauthorized access!");
            }
            else if (roles.includes(user.role)) {
                next();
            }
            else {
                throw new Error("Unauthorized access!");
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.verify_authorization = verify_authorization;

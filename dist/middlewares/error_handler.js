"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allErrorHandler = exports.routeNotFound = void 0;
const error_codes_from_message_1 = require("../utils/error_codes_from_message");
const colors_1 = __importDefault(require("@colors/colors"));
const routeNotFound = (req, res, next) => {
    try {
        res.send({
            status: "failed",
            message: "Route doesn't exist!",
        });
        console.log(colors_1.default.red("Route doesn't exist!"));
    }
    catch (error) {
        next(error);
    }
};
exports.routeNotFound = routeNotFound;
const allErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        throw new Error("Something went wrong!");
    }
    else {
        if (err) {
            res.status((0, error_codes_from_message_1.error_code_from_message)(err.message)).send({
                status: "failed",
                message: err.message,
            });
            console.log(colors_1.default.red(err.message));
        }
        else {
            res.send({
                status: "failed",
                message: "Internal server error!",
            });
            console.log(colors_1.default.red("Internal server error!"));
        }
    }
};
exports.allErrorHandler = allErrorHandler;

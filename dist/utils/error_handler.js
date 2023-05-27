"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allErrorHandler = exports.routeNotFound = void 0;
const colour_1 = __importDefault(require("colour"));
const routeNotFound = (req, res, next) => {
    res.send({
        status: "failed",
        message: "Route doesn't exist!",
    });
    console.log(colour_1.default.red("Route doesn't exist!"));
};
exports.routeNotFound = routeNotFound;
const allErrorHandler = (err, req, res, next) => {
    res.send({
        status: "failed",
        message: err.message,
    });
    console.log(colour_1.default.red(err.message));
};
exports.allErrorHandler = allErrorHandler;

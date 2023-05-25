"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allErrorHandler = exports.routeNotFound = void 0;
const routeNotFound = (req, res, next) => {
    res.send({
        status: "failed",
        message: "Route doesn't exist!",
    });
    console.log("Route doesn't exist!");
};
exports.routeNotFound = routeNotFound;
const allErrorHandler = (err, req, res, next) => {
    res.send({
        status: "failed",
        message: err.message,
    });
    console.log(err.message);
};
exports.allErrorHandler = allErrorHandler;

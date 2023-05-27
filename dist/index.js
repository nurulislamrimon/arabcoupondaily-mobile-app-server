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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external imports
const colour_1 = __importDefault(require("colour"));
// internal imports============
const app_1 = __importDefault(require("./app"));
const dbconnection_1 = __importDefault(require("./utils/dbconnection"));
const error_handler = __importStar(require("./middlewares/error_handler"));
const user_router_1 = __importDefault(require("./modules/user.module/user.router"));
const store_router_1 = __importDefault(require("./modules/store.module/store.router"));
// database connection======
(0, dbconnection_1.default)();
// routes=========
app_1.default.use("/api/v1/user", user_router_1.default);
app_1.default.use("/api/v1/store", store_router_1.default);
// error handler======
app_1.default.use(error_handler.routeNotFound);
app_1.default.use(error_handler.allErrorHandler);
// app listener
app_1.default.listen(process.env.port, () => {
    console.log(colour_1.default.magenta(`Example app listening on port ${process.env.port}`));
});

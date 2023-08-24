"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// dot env configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// home route
app.get("/", (req, res) => {
    res.send({ status: "success", data: "Welcome to Arabcoupondaily!" });
    console.log("Welcome to Arabcoupondaily");
});
exports.default = app;

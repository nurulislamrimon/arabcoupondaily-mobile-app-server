"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// dot env configuration
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// create app
const app = (0, express_1.default)();
// home route
app.get("/", (req, res) => {
    a;
    res.send("Hello World!");
});
exports.default = app;

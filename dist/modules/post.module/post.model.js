"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const postSchema = new mongoose_1.Schema({
    postTitle: { type: String, required: true },
    storeName: { type: String, required: true },
    postType: { type: String, enum: ["coupon", "deal"], default: "coupon" },
    expireDate: { type: Date, validate: validator_1.default.isDate },
    country: [String],
    isVerified: { type: Boolean, default: false },
    revealed: { type: Number, default: 0 },
    couponCode: String,
    externalLink: String,
    postDescription: String,
    postBy: {
        name: String,
        email: String,
        moreAboutUser: mongoose_2.Types.ObjectId,
    },
    updateBy: [
        {
            name: String,
            email: String,
            moreAboutUser: mongoose_2.Types.ObjectId,
        },
    ],
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;

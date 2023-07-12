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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const store_model_1 = __importDefault(require("../store.module/store.model"));
const postSchema = new mongoose_1.Schema({
    postTitle: { type: String, required: true },
    store: {
        type: mongoose_2.Types.ObjectId,
        required: true,
        ref: "Store",
    },
    postType: { type: String, enum: ["coupon", "deal"], default: "coupon" },
    expireDate: { type: Date, validate: validator_1.default.isDate },
    country: [String],
    isVerified: { type: Boolean, default: false },
    revealed: { type: Number, default: 0 },
    couponCode: String,
    externalLink: { type: String, validate: validator_1.default.isURL },
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
postSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.postType === "coupon" && !this.couponCode) {
            throw new Error("Please provide a coupon code!");
        }
        else if (this.postType === "deal" && !this.externalLink) {
            throw new Error("Please provide deal link!");
        }
    });
});
postSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = yield store_model_1.default.findOne({ storeName: this.store.storeName });
        this.store.photoURL = (store === null || store === void 0 ? void 0 : store.photoURL) || "";
    });
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;

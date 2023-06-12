import { Schema, model } from "mongoose";
import IPost from "./post.interface";
import { Types } from "mongoose";
import validator from "validator";
import Store from "../store.module/store.model";

const postSchema = new Schema<IPost>(
  {
    postTitle: { type: String, required: true },
    storeName: {
      type: String,
      required: true,
      validate: {
        validator: async function (value: string) {
          const count = await Store.countDocuments({ storeName: value });
          return count > 0;
        },
        message: "Invalid store name",
      },
    },
    postType: { type: String, enum: ["coupon", "deal"], default: "coupon" },
    expireDate: { type: Date, validate: validator.isDate },
    country: [String],
    isVerified: { type: Boolean, default: false },
    revealed: { type: Number, default: 0 },
    couponCode: String,
    externalLink: String,
    postDescription: String,
    postBy: {
      name: String,
      email: String,
      moreAboutUser: Types.ObjectId,
    },
    updateBy: [
      {
        name: String,
        email: String,
        moreAboutUser: Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);
export default Post;

import { Schema, model } from "mongoose";
import IPost from "./post.interface";
import { Types } from "mongoose";
import validator from "validator";

const postSchema = new Schema<IPost>(
  {
    postTitle: { type: String, required: true },
    store: {
      type: Types.ObjectId,
      required: true,
      ref: "Store",
    },
    postType: { type: String, enum: ["coupon", "deal"], default: "coupon" },
    expireDate: { type: Date, validate: validator.isDate },
    country: [String],
    isVerified: { type: Boolean, default: false },
    revealed: { type: Number, default: 0 },
    couponCode: String,
    externalLink: { type: String, validate: validator.isURL },
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

postSchema.pre("validate", async function (next) {
  if (this.postType === "coupon" && !this.couponCode) {
    throw new Error("Please provide a coupon code!");
  } else if (this.postType === "deal" && !this.externalLink) {
    throw new Error("Please provide deal link!");
  }
});
// postSchema.pre("save", async function (next) {
//   const store = await Store.findOne({ storeName: this.store.storeName });
//   this.store.photoURL = store?.photoURL || "";
// });

const Post = model<IPost>("Post", postSchema);
export default Post;

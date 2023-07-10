import { Types } from "mongoose";
import { Schema, model } from "mongoose";
import IUser from "./user.interface";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, validate: validator.isEmail },
    country: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: {
        values: ["admin", "manager"],
        message: `{VALUE} is not a valid role!`,
      },
    },
    newPosts: [
      {
        moreAboutPost: { type: Types.ObjectId, ref: "Post" },
        status: {
          type: String,
          enum: ["readed", "unreaded"],
          default: "unreaded",
        },
      },
    ],
    phoneNumber: String,
    password: String,
    confirmPassword: String,
    provider: { name: String },
    favourite: {
      stores: [{ type: Types.ObjectId, ref: "Store" }],
      posts: [{ type: Types.ObjectId, ref: "Post" }],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", async function (next) {
  if (this.provider?.name) {
    this.isVerified = true;
    next();
  } else if (this.password) {
    const isStrongPassword = /[a-zA-Z]/g.test(this.password);
    if (!isStrongPassword) {
      throw new Error("Please provide a strong password!");
    } else if (this.password === this.confirmPassword) {
      this.password = await bcrypt.hash(this.password, 10);
      this.confirmPassword = undefined;
      next();
    } else {
      throw new Error(
        "Please make sure password and confirm password are same!"
      );
    }
  } else {
    throw new Error("Password not found!");
  }
});
const User = model<IUser>("User", userSchema);
export default User;

import { Schema, model } from "mongoose";
import IUser from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  phoneNumber: String,
  password: String,
  retypePassword: String,
  provider: Object,
});

userSchema.pre("validate", async function (next) {
  if (this.provider) {
    next();
  } else if (this.password) {
    const isStrongPassword = /[a-zA-Z][0-9]/.test(this.password);
    if (!isStrongPassword) {
      throw new Error("Please provide a strong password!");
    } else if (this.password === this.retypePassword) {
      this.password = await bcrypt.hash(this.password, 10);
      this.retypePassword = undefined;
      next();
    } else {
      throw new Error("Please enter the same password!");
    }
  } else {
    throw new Error("Password not found!");
  }
});
const User = model<IUser>("User", userSchema);
export default User;

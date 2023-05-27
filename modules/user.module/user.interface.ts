import { Types } from "mongoose";
export default interface IUser {
  name: string;
  email: string;
  country: string;
  isVerified: boolean;
  role: string;
  readedPosts: Types.ObjectId[];
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  provider?: { name: string; userId: string };
}

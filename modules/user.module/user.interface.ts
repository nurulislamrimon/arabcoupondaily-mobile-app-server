// import { ObjectId } from "mongoose/types";
export default interface IUser {
  name: string;
  email: string;
  country: string;
  isVerified: boolean;
  readedPosts: object[];
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  provider?: { name: string; userId: string };
}

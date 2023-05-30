import { Types } from "mongoose";
import User from "./user.model";
import bcrypt from "bcrypt";
//== get all users
export const getAllUserService = async (query: any) => {
  const result = await User.find({});
  return result;
};
//== get user by email address without password
export const getUserByEmailService = async (email: string) => {
  const result = await User.findOne(
    { email: email },
    { password: 0, readedPosts: 0 }
  );
  return result;
};
//== create new user
export const addNewUserService = async (user: object) => {
  const result = await User.create(user).then((data) => {
    data.password = undefined;
    return data;
  });
  return result;
};
//== delete user
export const deleteAUserByEmailService = async (email: string) => {
  const result = await User.deleteOne({ email: email });
  return result;
};
//== compare password by email and password
export const comparePassword = async (email: string, password: string) => {
  const user = await User.findOne({ email: email }, { password: 1 });
  const isPasswordMatched = await bcrypt.compare(
    password,
    user?.password || ""
  );
  return isPasswordMatched;
};
//== verify a user
export const verifyAUserService = async (id: Types.ObjectId) => {
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        isVerified: true,
      },
    }
  );
  return result;
};

import { Types } from "mongoose";
export default interface IUser {
  photoURL?: string;
  name: string;
  email: string;
  country: string;
  isVerified: boolean;
  role?: string;
  newPosts: [
    {
      moreAboutPost: Types.ObjectId;
      status: string;
    }
  ];
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  provider?: { name: string; userId: string };
  favourite: {
    stores: Types.ObjectId[];
    posts: Types.ObjectId[];
  };
}

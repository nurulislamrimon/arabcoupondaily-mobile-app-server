import { Types } from "mongoose";

export default interface IPost {
  postTitle: string;
  store: Types.ObjectId;
  postType: string;
  expireDate: Date;
  country: string[];
  isVerified: boolean;
  revealed: number;
  couponCode?: string;
  externalLink?: string;
  postDescription?: string;
  postBy: {
    name: string;
    email: string;
    moreAboutUser: Types.ObjectId;
  };
  updateBy?: [
    {
      name: string;
      email: string;
      moreAboutUser: Types.ObjectId;
    }
  ];
}

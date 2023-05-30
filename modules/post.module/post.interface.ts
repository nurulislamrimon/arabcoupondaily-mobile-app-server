import { Types } from "mongoose";

export default interface IPost {
  postTitle: string;
  storeName: string;
  postType: string;
  expireDate: Date;
  country: string[];
  isVerified: boolean;
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

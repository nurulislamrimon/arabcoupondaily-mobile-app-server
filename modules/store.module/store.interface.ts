import { Types } from "mongoose";

export default interface IStore {
  photoURL: string;
  storeName: string;
  country: string[];
  storeExternalLink: string;
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
  description?: string;
  howToUse?: { id: string; photoURL?: string; type: string; content: string }[];
}

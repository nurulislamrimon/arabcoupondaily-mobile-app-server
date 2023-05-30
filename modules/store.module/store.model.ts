import { Schema, model } from "mongoose";
import IStore from "./store.interface";
import validator from "validator";
import { Types } from "mongoose";

const storeSchema = new Schema<IStore>(
  {
    photoURL: { type: String, validate: validator.isURL, required: true },
    storeName: { type: String, required: true },
    country: [{ type: String, required: true }],
    storeExternalLink: { type: String, required: true },
    postBy: {
      name: { type: String, required: true },
      email: { type: String, required: true, validate: validator.isEmail },
      moreAboutUser: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    updateBy: [
      {
        name: String,
        email: { type: String, validate: validator.isEmail },
        moreAboutUser: {
          type: Types.ObjectId,
          ref: "User",
        },
      },
    ],
    description: String,
    howToUse: [
      {
        photoURL: { type: String, validate: validator.isURL },
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const Store = model<IStore>("Store", storeSchema);
export default Store;

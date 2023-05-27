import { Schema, model } from "mongoose";
import IStore from "./store.interface";

const storeSchema = new Schema<IStore>({
  photoURL: { type: String, required: true },
  storeName: { type: String, required: true },
  country: [{ type: String, required: true }],
  storeExternalLink: { type: String, required: true },
  description: String,
  howToUse: [{ photoURL: String, title: String, description: String }],
});

const Store = model<IStore>("Store", storeSchema);
export default Store;

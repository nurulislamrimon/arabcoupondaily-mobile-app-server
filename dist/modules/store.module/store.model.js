"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    photoURL: { type: String, required: true },
    storeName: { type: String, required: true },
    country: [{ type: String, required: true }],
    storeExternalLink: { type: String, required: true },
    description: String,
    howToUse: [{ photoURL: String, title: String, description: String }],
});
const Store = (0, mongoose_1.model)("Store", storeSchema);
exports.default = Store;

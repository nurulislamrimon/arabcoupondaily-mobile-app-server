"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude_fields = exports.user_query_fields = exports.store_query_fields = exports.post_query_fields = void 0;
exports.post_query_fields = [
    "_id",
    "postTitle",
    "storeName",
    "postType",
    "country",
    "createdAt",
];
exports.store_query_fields = [
    "_id",
    "storeName",
    "postType",
    "country",
    "createdAt",
];
exports.user_query_fields = [
    "_id",
    "name",
    "email",
    "country",
    "isVerified",
    "role",
    "createdAt",
];
exports.exclude_fields = ["createdAt", "expireDate", "_id", "isVerified"];

export const post_query_fields = [
  "_id",
  "postTitle",
  "storeName",
  "store._id",
  "postType",
  "country",
  "createdAt",
  "expireDate",
];
export const store_query_fields = [
  "_id",
  "storeName",
  "postType",
  "country",
  "createdAt",
];
export const user_query_fields = [
  "_id",
  "name",
  "email",
  "country",
  "isVerified",
  "role",
  "createdAt",
];

export const exclude_fields = [
  "createdAt",
  "expireDate",
  "_id",
  "isVerified",
  "store._id",
];

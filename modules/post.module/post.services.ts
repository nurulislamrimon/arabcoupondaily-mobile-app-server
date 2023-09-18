import { Types } from "mongoose";
import Post from "./post.model";
import User from "../user.module/user.model";
import { search_filter_and_queries } from "../../utils/search_filter_and_queries";
import { post_query_fields, store_query_fields } from "../../utils/constants";
import Store from "../store.module/store.model";

//== get Post by name
export const searchGloballyOnPostService = async (query: object) => {
  const { filters: storeFilters } = search_filter_and_queries(
    "store",
    query,
    "storeName"
  ) as any;

  const stores = await Store.find(storeFilters, {
    postBy: 0,
    updateBy: 0,
    howToUse: 0,
  });
  const posts = await getAllPosts(query, false);
  return { stores, posts: posts };
};
//== get Post by name
export const getPostByPostTitleService = async (postTitle: string) => {
  const result = await Post.findOne({ postTitle: postTitle }).populate(
    "store",
    {
      storeName: 1,
      photoURL: 1,
    }
  );
  return result;
};
//== get Post by store Id
export const getPostByStoreIdService = async (storeId: Types.ObjectId) => {
  const result = await Post.find({ store: storeId }).populate("store", {
    storeName: 1,
    photoURL: 1,
  });
  return result;
};
//== get Post by objectId
export const getPostByIdService = async (id: Types.ObjectId) => {
  const result = await Post.findOne(
    { _id: id },
    { postBy: 0, updateBy: 0 }
  ).populate("store", {
    storeName: 1,
    photoURL: 1,
  });
  return result;
};

//== create new Post
export const addNewPostService = async (post: object) => {
  const createdPost = await Post.create(post);
  const result = await createdPost.populate("store", {
    storeName: 1,
    photoURL: 1,
  });
  await setPostAsUnreadToUserService(createdPost._id);
  return result;
};

//== add post as unread to all verified users
export const setPostAsUnreadToUserService = async (postId: Types.ObjectId) => {
  const result = await User.updateMany(
    { isVerified: true },
    { $push: { newPosts: { moreAboutPost: postId } } }
  );
  return result;
};

//== update a Post
export const updateAPostService = async (
  PostId: Types.ObjectId,
  newData: any
) => {
  // add updator info
  let { updateBy, existPost, ...updateData } = newData;

  updateBy = { ...existPost.updateBy, ...updateBy };

  const result = await Post.updateOne(
    { _id: PostId },
    { $set: updateData, $push: { updateBy: updateBy } },
    { runValidators: true, upsert: true }
  );

  return result;
};

//== update a Post
export const revealedAPostService = async (PostId: Types.ObjectId) => {
  const result = await Post.updateOne(
    { _id: PostId },
    { $inc: { revealed: 1 } }
  );

  return result;
};

export const getAllPosts = async (query: any, isActivePostOnly: boolean) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries("post", query, ...post_query_fields) as any;

  // set expiredate to show only active post
  const validityCheck = {
    expireDate: { $gt: new Date() },
  };
  // client side only
  isActivePostOnly && filters.$and.push(validityCheck);

  const result = await Post.aggregate([
    {
      $lookup: {
        from: "stores",
        localField: "store",
        foreignField: "_id",
        as: "storePopulated",
      },
    },
    {
      $addFields: {
        store: { $arrayElemAt: ["$storePopulated", 0] },
      },
    },
    {
      $project: {
        "store._id": 1,
        "store.storeName": 1,
        "store.photoURL": 1,
        postTitle: 1,
        postType: 1,
        externalLink: 1,
        expireDate: 1,
        country: 1,
        isVerified: 1,
        revealed: 1,
        couponCode: 1,
        createdAt: 1,
      },
    },
    {
      $match: filters,
    },
    {
      $sort: { [sortBy]: sortOrder },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  const totalDocuments = await Post.aggregate([
    {
      $lookup: {
        from: "stores",
        localField: "store",
        foreignField: "_id",
        as: "storePopulated",
      },
    },
    {
      $addFields: {
        store: { $arrayElemAt: ["$storePopulated", 0] },
      },
    },
    {
      $project: {
        "store._id": 1,
        "store.storeName": 1,
        "store.photoURL": 1,
        postTitle: 1,
        postType: 1,
        expireDate: 1,
        country: 1,
        isVerified: 1,
        revealed: 1,
        couponCode: 1,
        createdAt: 1,
      },
    },
    {
      $match: filters,
    },
    {
      $count: "totalDocuments",
    },
  ]);
  return {
    meta: {
      page,
      limit,
      totalDocuments: totalDocuments.length
        ? totalDocuments[0].totalDocuments
        : 0,
    },
    data: result,
  };
};

//== delete a Post
export const deleteAPostService = async (PostId: Types.ObjectId) => {
  const result = await Post.deleteOne({ _id: PostId });

  return result;
};

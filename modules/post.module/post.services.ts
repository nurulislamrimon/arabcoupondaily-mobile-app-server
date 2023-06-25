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
    ...store_query_fields
  ) as any;
  const { filters: postFilters } = search_filter_and_queries(
    "post",
    query,
    ...post_query_fields
  ) as any;

  const stores = await Store.find(storeFilters, {
    postBy: 0,
    updateBy: 0,
  });
  const posts = await Post.find(postFilters, {
    postBy: 0,
    updateBy: 0,
  });
  return { stores, posts };
};
//== get Post by name
export const getPostByPostTitleService = async (postTitle: string) => {
  const result = await Post.findOne({ postTitle: postTitle });
  return result;
};
//== get Post by objectId
export const getPostByIdService = async (id: Types.ObjectId) => {
  const result = await Post.findOne({ _id: id });
  return result;
};

//== create new Post
export const addNewPostService = async (post: object) => {
  const result = await Post.create(post);
  await setPostAsUnreadToUserService(result._id);
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

// get all active Posts
export const getAllActivePosts = async (query: any) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries("post", query, ...post_query_fields) as any;

  // set expiredate to show only active post
  const validityCheck = {
    expireDate: { $gt: new Date() },
  };
  filters.$and.push(validityCheck);
  console.log(filters);

  const result = await Post.find(filters, {
    postBy: 0,
    updateBy: 0,
  })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const totalDocuments = await Post.countDocuments(filters);
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    // data: filters,
    data: result,
  };
};

// get all Posts
export const getAllPosts = async (query: any) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries("post", query, ...post_query_fields) as any;

  const result = await Post.find(filters)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const totalDocuments = await Post.countDocuments(filters);
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};

//== delete a Post
export const deleteAPostService = async (PostId: Types.ObjectId) => {
  const result = await Post.deleteOne({ _id: PostId });

  return result;
};

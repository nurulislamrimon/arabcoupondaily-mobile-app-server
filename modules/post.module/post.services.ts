import { Types } from "mongoose";
import { addFiltersSymbolToOperators } from "../../utils/add_filters_operator";
import Post from "./post.model";
import User from "../user.module/user.model";

//== get Post by name
export const searchGloballyOnPostService = async (key: string) => {
  const result = await Post.find(
    {
      $or: [
        { postTitle: { $regex: key, $options: "i" } },
        { storeName: { $regex: key, $options: "i" } },
        { postType: { $regex: key, $options: "i" } },
        { country: { $regex: key, $options: "i" } },
      ],
    },
    {
      postBy: 0,
      updateBy: 0,
    }
  );
  return result;
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
  const { limit, page, sort, ...filters } = query;
  const filtersWithOperator = addFiltersSymbolToOperators(filters);

  const filtersWithExpireDate = {
    expireDate: { $gt: new Date() },
    ...filtersWithOperator,
  };

  const result = await Post.find(filtersWithExpireDate, {
    postBy: 0,
    updateBy: 0,
  })
    .sort(sort)
    .skip(page * limit)
    .limit(limit);
  return result;
};

// get all Posts
export const getAllPosts = async (query: any) => {
  const { limit, page, sort, ...filters } = query;
  const filtersWithOperator = addFiltersSymbolToOperators(filters);

  const result = await Post.find(filtersWithOperator)
    .sort(sort)
    .skip(page * limit)
    .limit(limit);
  return result;
};

//== delete a Post
export const deleteAPostService = async (PostId: Types.ObjectId) => {
  const result = await Post.deleteOne({ _id: PostId });

  return result;
};

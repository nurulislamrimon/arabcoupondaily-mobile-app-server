import { Types } from "mongoose";
import { addFiltersSymbolToOperators } from "../../utils/add_filters_operator";
import Post from "./post.model";

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

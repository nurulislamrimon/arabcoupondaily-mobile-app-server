import { Types } from "mongoose";
import User from "./user.model";
import bcrypt from "bcrypt";
import { search_filter_and_queries } from "../../utils/search_filter_and_queries";
import { user_query_fields } from "../../utils/constants";
//== get all users
export const getAllUserService = async (query: any) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries("user", query, ...user_query_fields) as any;

  const result = await User.find(filters, {
    password: 0,
    newPosts: 0,
  })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const totalDocuments = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};
//== get user by email address without password
export const getUserByEmailService = async (email: string) => {
  const result = await User.findOne(
    { email: email },
    { password: 0, newPosts: 0 }
  );
  return result;
};
//== get user by id
export const getUserByIdService = async (id: Types.ObjectId) => {
  const result = await User.findOne({ _id: id }, { password: 0 });
  return result;
};
//== create new user
export const addNewUserService = async (user: object) => {
  const result = await User.create(user).then((data) => {
    data.password = undefined;
    return data;
  });
  return result;
};
//== delete user
export const deleteAUserByEmailService = async (email: string) => {
  const result = await User.deleteOne({ email: email });
  return result;
};
//== compare password by email and password
export const comparePassword = async (email: string, password: string) => {
  const user = await User.findOne({ email: email }, { password: 1 });
  const isPasswordMatched = await bcrypt.compare(
    password,
    user?.password || ""
  );
  return isPasswordMatched;
};
//== verify a user
export const verifyAUserService = async (id: Types.ObjectId) => {
  const result = await User.updateOne(
    { _id: id },
    {
      $set: {
        isVerified: true,
      },
    }
  );
  return result;
};

// =====notification also====
// calculate unreaded post
export const getUnreadedNotificationCountService = async (email: string) => {
  const result = await User.aggregate([
    {
      $match: { email: email },
    },
    {
      $unwind: "$newPosts",
    },
    {
      $match: { "newPosts.status": "unreaded" },
    },
    {
      $count: "newPosts",
    },
  ]);

  return result ? result[0] : result;
};
//== get notification based on user
export const getNotificationService = async (email: string) => {
  const result = await User.findOne({ email: email }, { password: 0 }).populate(
    "newPosts.moreAboutPost",
    { postBy: 0, updateBy: 0 }
  );
  // .select("postBy");
  return result;
};
//== set notification based on user
export const setNotificationReadedService = async (
  email: string,
  postId: Types.ObjectId
) => {
  const result = await User.updateOne(
    {
      email: email,
      "newPosts.moreAboutPost": postId,
    },
    {
      $set: {
        "newPosts.$.status": "readed",
      },
    }
  ).populate("newPosts.moreAboutPost");
  return result;
};

// =========admin================
// get all admin and manager
export const getAllAdminAndManagerService = async (query: any) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries(
      "user",
      query,
      "postTitle",
      "storeName",
      "createdAt"
    ) as any;
  filters.$and.push({ $or: [{ role: "admin" }, { role: "manager" }] });
  console.log(filters);
  const result = await User.find(filters, {
    password: 0,
    newPosts: 0,
  })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
  const totalDocuments = await User.countDocuments({
    $or: [{ role: "admin" }, { role: "manager" }],
  });
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};
//== add new admin
export const addNewAdminService = async (id: Types.ObjectId) => {
  const result = await User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        role: "admin",
      },
    }
  );
  return result;
};
//== remove an admin
export const removeAnAdminService = async (id: Types.ObjectId) => {
  const result = await User.updateOne(
    {
      _id: id,
    },
    {
      $unset: { role: 1 },
    }
  );
  return result;
};
//== add new manager
export const addNewManagerService = async (id: Types.ObjectId) => {
  const result = await User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        role: "manager",
      },
    }
  );
  return result;
};

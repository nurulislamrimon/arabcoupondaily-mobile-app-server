import { Types } from "mongoose";
import Administrators from "./administrators.model";
import { search_filter_and_queries } from "../../utils/search_filter_and_queries";
import { user_query_fields } from "../../utils/constants";

//== create new Administrators
export const addNewAdministratorsService = async (payload: object) => {
  const result = await Administrators.create(payload);
  return result;
};

//== get Administrators by email address
export const getAdministratorsByEmailService = async (email: string) => {
  const result = await Administrators.findOne({ email: email });
  return result;
};

//== update an administrator
export const updateAdministratorService = async (
  id: Types.ObjectId,
  role: string
) => {
  const result = await Administrators.updateOne(
    { _id: id },
    { $set: { role: role } },
    { runValidators: true }
  );
  return result;
};
//== get all Administrators
export const getAdministratorsService = async () => {
  const result = await Administrators.find({});
  return result;
};

// ===================get ==================== === === ===

// =========admin================
// get all admin and manager
export const getAllAdminAndManagerService = async (query: any) => {
  const { filters, skip, page, limit, sortBy, sortOrder } =
    search_filter_and_queries("user", query, ...user_query_fields) as any;
  const result = await Administrators.aggregate([
    {
      $lookup: {
        from: "users",
        foreignField: "email",
        localField: "email",
        as: "userInfo",
      },
    },
    {
      $unwind: "$userInfo",
    },
    {
      $project: {
        _id: 1,
        email: 1,
        role: 1,
        name: "$userInfo.name",
        country: "$userInfo.country",
        isVerified: "$userInfo.isVerified",
        photoURL: "$userInfo.photoURL",
        createdAt: 1,
      },
    },
    {
      $match: filters,
    },
    {
      $sort: {
        [sortBy]: sortOrder,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);
  const totalDocuments = await Administrators.countDocuments(filters);
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};
// //== add new admin
// export const addNewAdminService = async (id: Types.ObjectId) => {
//   const result = await User.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         role: "admin",
//       },
//     }
//   );
//   return result;
// };
// //== remove an admin
// export const removeAnAdminService = async (id: Types.ObjectId) => {
//   const result = await User.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $unset: { role: 1 },
//     }
//   );
//   return result;
// };
// //== add new manager
// export const addNewManagerService = async (id: Types.ObjectId) => {
//   const result = await User.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         role: "manager",
//       },
//     }
//   );
//   return result;
// };

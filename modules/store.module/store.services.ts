import { Types } from "mongoose";
import { addFiltersSymbolToOperators } from "../../utils/add_filters_operator";
import Store from "./store.model";

//== get Store by name
export const getStoreByStoreNameService = async (storeName: string) => {
  const result = await Store.findOne({ storeName: storeName });
  return result;
};
//== get Store by objectId
export const getStoreByIdService = async (id: Types.ObjectId) => {
  const result = await Store.findOne({ _id: id });
  return result;
};

//== create new Store
export const addNewStoreService = async (store: object) => {
  const result = await Store.create(store);
  return result;
};
//== update a Store
export const updateAStoreService = async (
  storeId: Types.ObjectId,
  newData: any
) => {
  // add updator info
  let { updateBy, existStore, ...updateData } = newData;

  updateBy = { ...existStore.updateBy, ...updateBy };

  const result = await Store.updateOne(
    { _id: storeId },
    { $set: updateData, $push: { updateBy: updateBy } },
    { runValidators: true, upsert: true }
  );

  return result;
};

// get all stores
export const getAllStores = async (query: any) => {
  const { limit, page, sort, ...filters } = query;
  const filtersWithOperator = addFiltersSymbolToOperators(filters);

  const result = await Store.find(filtersWithOperator)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalDocuments = await Store.countDocuments();
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};

// get all active stores
export const getAllActiveStores = async (query: any) => {
  const { limit, page, sort, ...filters } = query;
  const filtersWithOperator = addFiltersSymbolToOperators(filters);

  const result = await Store.aggregate([
    {
      $lookup: {
        from: "posts",
        foreignField: "store.storeName",
        localField: "storeName",
        as: "existPosts",
      },
    },
    {
      $match: {
        existPosts: { $exists: true, $ne: [] },
      },
    },
    {
      $project: {
        existPosts: 0,
      },
    },
  ]);
  const totalDocuments = await Store.countDocuments();
  return {
    meta: {
      page,
      limit,
      totalDocuments,
    },
    data: result,
  };
};

//== delete a Store
export const deleteAStoreService = async (storeId: Types.ObjectId) => {
  const result = await Store.deleteOne({ _id: storeId });

  return result;
};

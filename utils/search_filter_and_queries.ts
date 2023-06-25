import { addFiltersSymbolToOperators } from "./add_filters_operator";
import { exclude_fields } from "./constants";
import { pick } from "./pick";

export const search_filter_and_queries = (
  modelName: string,
  query: object,
  ...fields: string[]
) => {
  const search_filter_and_queries = [];

  const { searchTerm, ...filterFields } = pick(query, [
    "searchTerm",
    ...fields,
  ]);

  // search term==========
  if (searchTerm) {
    const searchableFields = fields.filter((field) => {
      if (!exclude_fields.includes(field)) {
        return field;
      }
    });
    search_filter_and_queries.push({
      $or: searchableFields.map((field) => {
        if (modelName === "post" && field === "storeName") {
          return { "store.storeName": { $regex: searchTerm, $options: "i" } };
        } else {
          return {
            [field]: { $regex: searchTerm, $options: "i" },
          };
        }
      }),
    });
  }
  // filtering==========
  if (Object.keys(filterFields).length) {
    search_filter_and_queries.push({
      $and: Object.entries(filterFields).map(([field, value]) => {
        if (!exclude_fields.includes(field)) {
          if (modelName === "post" && field === "storeName") {
            return { "store.storeName": { $regex: value, $options: "i" } };
          } else {
            return {
              [field]: { $regex: value, $options: "i" },
            };
          }
        } else {
          const valueWithOperator = addFiltersSymbolToOperators(value);
          return {
            [field]: valueWithOperator,
          };
        }
      }),
    });
  }
  // queries
  const queryFields = ["sortBy", "sortOrder", "page", "limit"];

  let { sortBy, sortOrder, page, limit } = pick(query, queryFields);
  if (!sortBy) {
    sortBy = "createdAt";
  }
  if (!sortOrder) {
    sortOrder = 1;
  } else if (sortOrder === "1" || sortOrder === "-1") {
    sortOrder = Number(sortOrder);
  }
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 10;
  }
  const skip = (page - 1) * limit;
  // push empty object to avoid error in aggregation
  if (!search_filter_and_queries.length) {
    search_filter_and_queries.push({});
  }
  return {
    filters: { $and: search_filter_and_queries },
    limit,
    page,
    skip,
    sortBy,
    sortOrder,
  };
};

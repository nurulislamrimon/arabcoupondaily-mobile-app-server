export const addFiltersSymbolToOperators = (filters: any) => {
  if (filters.storeName) {
    filters.storeName = { $regex: filters.storeName, $options: "i" };
  } else if (filters.country) {
    filters.country = { $regex: filters.country, $options: "i" };
  } else if (filters.email) {
    filters.postBy = { email: { $regex: filters.email, $options: "i" } };
  }
  let filtersString = JSON.stringify(filters);
  filtersString = filtersString.replace(
    /gt|gte|lt|lte/g,
    (match) => `$${match}`
  );
  return JSON.parse(filtersString);
};

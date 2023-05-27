import Store from "./store.model";

//== get Store by email address without password
export const getStoreByNameService = async (storeName: string) => {
  const result = await Store.findOne({ storeName: storeName });

  return result;
};
//== create new Store
export const addNewStoreService = async (store: object) => {
  const result = await Store.create(store);
  return result;
};
// //== compare password by email and password
// export const comparePassword = async (email: string, password: string) => {
//   const Store = await Store.findOne({ email: email }, { password: 1 });
//   const isPasswordMatched = await bcrypt.compare(
//     password,
//     Store?.password || ""
//   );
//   return isPasswordMatched;
// };
// //== verify a Store
// export const verifyAStoreService = async (id: object) => {
//   const result = await Store.updateOne(
//     { _id: id },
//     {
//       $set: {
//         isVerified: true,
//       },
//     }
//   );
//   return result;
// };

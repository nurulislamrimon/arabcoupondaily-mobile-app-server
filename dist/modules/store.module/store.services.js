"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewStoreService = exports.getStoreByNameService = void 0;
const store_model_1 = __importDefault(require("./store.model"));
//== get Store by email address without password
const getStoreByNameService = (storeName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_model_1.default.findOne({ storeName: storeName });
    return result;
});
exports.getStoreByNameService = getStoreByNameService;
//== create new Store
const addNewStoreService = (store) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield store_model_1.default.create(store);
    return result;
});
exports.addNewStoreService = addNewStoreService;
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

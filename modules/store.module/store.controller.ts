import { NextFunction, Request, Response } from "express";
import * as storeServices from "./store.services";

// signup controller
export const addNewStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoURL, storeName, country, storeExternalLink } = req.body;
    const existStore = await storeServices.getStoreByNameService(storeName);

    if (!photoURL || !storeName || !country || !storeExternalLink) {
      throw new Error("Please enter required information!");
    } else if (existStore?.storeName === storeName) {
      throw new Error("Store already exist!");
    } else {
      const result = await storeServices.addNewStoreService(req.body);
      res.send({
        status: "success",
        data: result,
      });
      console.log(`Store ${result} sign up!`);
    }
  } catch (error) {
    next(error);
  }
};
// // login controller
// export const loginStoreController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body;
//     const Store = await StoreServices.getStoreByEmailService(email);
//     if (!Store) {
//       throw new Error("Store not found, Please 'sign up' first!");
//     } else {
//       let token;
//       // check password or provider exist
//       if (password) {
//         const isPasswordMatched = await StoreServices.comparePassword(
//           email,
//           password
//         );
//         if (isPasswordMatched) {
//           token = generate_token(Store);
//         } else {
//           throw new Error("Incorrect email or password!");
//         }
//       } else if (!Store.provider?.name) {
//         throw new Error("Please provide a valid credential!");
//       }

//       res.send({
//         status: "success",
//         data: { Store, token },
//       });
//       console.log(`Store ${Store.email} is responsed!`);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// // verify a Store by Store token
// export const verifyAStoreController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const decoded = req.headers.decoded;
//     const email = decoded ? decoded[0] : "";
//     const Store = await StoreServices.getStoreByEmailService(email);
//     if (!Store) {
//       throw new Error("Store not found!");
//     } else if (Store.isVerified) {
//       throw new Error("Store already verified!");
//     } else {
//       const result = await StoreServices.verifyAStoreService(Store._id);

//       res.send({
//         status: "success",
//         data: result,
//       });
//       console.log(result);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

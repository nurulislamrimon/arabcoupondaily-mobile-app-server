import { Types } from "mongoose";
import Administrators from "./administrators.model";

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

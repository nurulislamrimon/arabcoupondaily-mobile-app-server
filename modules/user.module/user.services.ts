import User from "./user.model";

export const addNewUserService = async (user: object) => {
  const result = await User.create(user);
  return result;
};

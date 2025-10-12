import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);

  if (!user) {
    throw new Error(`Couldn't find user with email: ${email}`);
  }

  if (!isUserValid(user, password)) {
    throw new Error("Password is incorrect");
  }

  return user;
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};

import jwt from "jsonwebtoken";
import { insertSession } from "../models/adminUser/session/SessionModel.js";
import { updateOneAdminUser } from "../models/adminUser/AdminUserModel.js";

///create access using the user data
export const signAccessJWT = async (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15min",
  });

  const obj = {
    token: accessToken,
    type: "jwt",
  };

  await insertSession(obj);
  return accessToken;
};

///create Refresh token using the user data
export const signRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};

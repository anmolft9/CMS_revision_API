import jwt from "jsonwebtoken";

///create token using the user data
export const signAccessJWT = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET);
};

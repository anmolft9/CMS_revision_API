import jwt from "jsonwebtoken";

export const signAccessJWT = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET);
};

import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log("DB couldnot be connected");
    }

    const con = mongoose.connect(conStr);

    con && console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

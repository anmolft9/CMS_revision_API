import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: "string",
      required: true,
    },
    associate: {
      type: "string",
      default: "",
    },
    type: {
      type: "string",
      required: true,
    },
    expires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);

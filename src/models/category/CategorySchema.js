import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
      maxLength: 50,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", CategorySchema);

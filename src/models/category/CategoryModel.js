import CategorySchema from "./CategorySchema.js";

//insert category
export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

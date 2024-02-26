import CategorySchema from "./CategorySchema.js";

//insert category
export const insertCategpry = () => {
  return CategorySchema(obj).save();
};

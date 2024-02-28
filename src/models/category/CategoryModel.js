import CategorySchema from "./CategorySchema.js";

//insert category
export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

//fetch all the category
export const getAllCategory = () => {
  return CategorySchema.find();
};

//fetch a particular category
export const getOneCategory = (_id) => {
  return CategorySchema.findById(_id);
};

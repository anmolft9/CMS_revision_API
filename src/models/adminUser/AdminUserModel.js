import AdminUserSchema from "./AdminUserSchema.js";

export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

//update admin user
export const updateOneAdminUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};

///find the user
export const findOneAdminUser = (filter) => {
  return AdminUserSchema.findOne(filter);
};

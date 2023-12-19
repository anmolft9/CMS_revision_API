import joi from "joi";

const newAdminUserValidation = (req, res, next) => {
  try {
    ///define rules and give data to the rules
    const schema = Joi.object({
      fName,
      Lname,
      email,
      password,
      phone,
      address,
      dob,
    });
  } catch (error) {
    next(error);
  }
};

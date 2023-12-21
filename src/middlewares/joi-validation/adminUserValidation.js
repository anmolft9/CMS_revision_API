import Joi from "joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    ///define rules and give data to the rules
    const schema = Joi.object({
      fName: Joi.string().max(20).required,
      Lname: Joi.string().max(20).required,
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().max(100).required,
      phone: Joi.string().max(20).required,
      address: Joi.string().max(200),
      dob: Joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 200;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

import Joi from "joi";
import {
  ADDRESS,
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  PASSWORD,
  PHONE,
} from "./constant";

export const newAdminUserValidation = (req, res, next) => {
  try {
    ///define rules and give data to the rules
    const schema = Joi.object({
      fName: FNAME.required(),
      lName: LNAME.required(),
      email: EMAIL.required(),
      password: PASSWORD.required(),
      phone: PHONE,
      address: ADDRESS,
      DOB: DATE.allow("", null),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const emailVerificationValidation = (req, res, next) => {
  try {
    ///define rules and give data to the rules
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      emailValidationCode: Joi.string().max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

///login validation
export const loginValidation = (req, res, next) => {
  try {
    ///define rules and give data to the rules
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

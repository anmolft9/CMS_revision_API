import Joi from "joi";
import {
  ADDRESS,
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  PASSWORD,
  PHONE,
  SHORTSTR,
  STATUS,
  validator,
} from "./constant.js";

//user registration validation
export const newAdminUserValidation = (req, res, next) => {
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

  validator(schema, req, res, next); //variable defined in the constant.js
};

//email validation
export const emailVerificationValidation = (req, res, next) => {
  ///define rules and give data to the rules
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

///login validation
export const loginValidation = (req, res, next) => {
  ///define rules and give data to the rules
  const schema = Joi.object({
    email: EMAIL.required(),
    password: PASSWORD.required(),
  });

  validator(schema, req, res, next);
};

// =================================================================
// categories

export const newCategoryValidation = (req, res, next) => {
  ///define rules and give data to the rules

  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS.required(),
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });

  validator(schema, req, res, next);
};

export const updateCategoryValidation = (req, res, next) => {
  ///define rules and give data to the rules

  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS.required(),
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
    _id: SHORTSTR.required(),
  });

  validator(schema, req, res, next);
};

import express from "express";
import { insertAdminUser } from "../models/adminUser/AdminUserModel.js";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { newAdminUserValidation } from "../middlewares/joi-validation/adminUserValidation.js";

const router = express.Router();

//server side validation
//encrypt user password
//insert into the db
//create unique verification code
//send created a like pointing to our frontedn with the email and verification code and send to their email

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;

    req.body.password = hashPassword(password);

    const user = await insertAdminUser(req.body);

    user._id
      ? res.json({
          status: "success",
          message: "We have sent you an email to verify",
        })
      : res.json({
          status: "error",
          message: "unable to create admin user, error",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "email already used";
    }
    next(error);
  }
});

//patch
router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);

    res.json({
      status: "success",
      message: "verify email for the new admin user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;

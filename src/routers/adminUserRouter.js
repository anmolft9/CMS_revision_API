import express from "express";
import { insertAdminUser } from "../models/adminUser/AdminUserModel.js";
import { hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/adminUserValidation.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelper.js";

const router = express.Router();

//server side validation
//encrypt user password
//insert into the db
//create unique verification code
//send created a like pointing to our frontedn with the email and verification code and send to their email

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    console.log("here1");
    const { password } = req.body;

    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);

    if (user._id) {
      console.log("here");
      res.json({
        status: "success",
        message: "We have sent you an email to verify",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      //send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
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
router.patch("/verify-email", emailVerificationValidation, (req, res, next) => {
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

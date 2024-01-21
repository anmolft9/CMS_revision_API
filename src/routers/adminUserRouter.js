import express from "express";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/adminUserValidation.js";
import { v4 as uuidv4 } from "uuid";
import {
  userVerifiedNotification,
  verificationEmail,
} from "../helpers/emailHelper.js";

const router = express.Router();

//server side validation
//encrypt user password
//insert into the db
//create unique verification code
//send created a like pointing to our frontedn with the email and verification code and send to their email

///post new user
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

//patch to verify email
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, emailValidationCode } = req.body;

      const user = await updateOneAdminUser(
        {
          email,
          emailValidationCode,
        },
        {
          status: "active",
          emailValidationCode: "",
        }
      );

      user?._id
        ? res.json({
            status: "success",
            message: "email Verified, login now",
          }) && userVerifiedNotification(user)
        : res.json({
            status: "error",
            message: "email couldnot be verified, try again",
          });
    } catch (error) {
      next(error);
    }
  }
);

///login router

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    //find if user exist based on given email

    const user = await findOneAdminUser({ email }); ///to check the email

    if (user?._id) {
      //check if the user is active?
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account hasnot been verified, please go to you email and click the link below,Thanks",
        });
      }
      //we need to verify if the pw sent by the user and the hash paswword matches?
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "logged in successfully",
          user,
        });
      }
    }

    res.json({
      status: "error",
      message: "Sorry, email or password doesnot match",
    });
  } catch (error) {
    next(error);
  }
});

export default router;

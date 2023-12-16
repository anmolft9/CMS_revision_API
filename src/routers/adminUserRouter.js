import express from "express";
import { insertAdminUser } from "../models/adminUser/AdminUserModel.js";
import { hashPassword } from "../helpers/bcryptHelper.js";

const router = express.Router();

//server side validation
//encrypt user password
//insert into the db
//create unique verification code
//send created a like pointing to our frontedn with the email and verification code and send to their email

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;

    const hashPass = hashPassword(password);
    console.log(hashPass);
    return;

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

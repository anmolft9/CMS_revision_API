import express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await insertAdminUser(req.body);

    user._id
      ? res.json({
          status: "success",
          message: "We have sent you an email to verify",
        })
      : res.json({
          status: "error",
          message: "unable to create admin user",
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

import express from "express";

const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    console.log(req.body);

    res.json({
      status: "success",
      message: "created new admin user",
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
      message: "verify email for new admin user",
    });
  } catch (error) {
    next(error);
  }
});

export default router;

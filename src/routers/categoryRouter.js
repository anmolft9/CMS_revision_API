import express from "express";
import { insertCategory } from "../models/category/CategoryModel.js";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";

const router = express.Router();

router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    const result = await insertCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "category added successfully",
        })
      : res.json({
          status: "error",
          message: "unable to save the category",
        });
  } catch (err) {
    next(err);
  }
});

export default router;

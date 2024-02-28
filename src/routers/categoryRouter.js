import express from "express";
import { insertCategory } from "../models/category/CategoryModel.js";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";
import slugify from "slugify";

const router = express.Router();

router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
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

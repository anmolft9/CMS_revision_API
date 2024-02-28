import express from "express";
import {
  getAllCategory,
  getOneCategory,
  insertCategory,
} from "../models/category/CategoryModel.js";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";
import slugify from "slugify";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id ? await getOneCategory(_id) : await getAllCategory();

    res.json({
      status: 200,
      message: "Fetched the categories",
      categories,
    });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

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

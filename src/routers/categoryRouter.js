import express from "express";
import {
  deleteCategory,
  getAllCategory,
  getOneCategory,
  hasChildCategory,
  insertCategory,
  updateCategoryById,
} from "../models/category/CategoryModel.js";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import slugify from "slugify";

const router = express.Router();

//retrieve category
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id ? await getOneCategory(_id) : await getAllCategory();

    res.json({
      status: "success",
      message: "Fetched the categories",
      categories,
    });
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

//insert category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const categories = await insertCategory(req.body);
    // console.log(result);

    categories?._id
      ? res.json({
          status: "success",
          message: "category added successfully",
          categories,
        })
      : res.json({
          status: "error",
          message: "unable to save the category",
        });
  } catch (err) {
    next(err);
  }
});

//update category
router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    const hasChild = await hasChildCategory(req.body._id);

    if (hasChild) {
      res.json({
        status: "error",
        message:
          "This category has children categories, Either delete or assign the children to different parent",
      });
    }

    const categoryUpdated = await updateCategoryById(req.body);
    console.log(categoryUpdated, req.body);
    categoryUpdated?._id
      ? res.json({
          status: "success",
          message: "category updated successfully",
        })
      : res.json({
          status: "error",
          message: "category could not be updated",
        });
  } catch (error) {
    next(error);
  }
});

//delete category
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const result = await deleteCategory(id);
    console.log(result);
    result
      ? res.json({
          status: "success",
          message: "category deleted successfully",
        })
      : res.json({
          status: "error",
          message: "couldnot be deleted",
        });
    console.log(result);
  } catch (error) {
    next(error);
  }
});

export default router;

const express = require("express");
const router = express.Router();
const {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/").get(getCategories).post(protect, setCategory);

router
  .route("/:id")
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;

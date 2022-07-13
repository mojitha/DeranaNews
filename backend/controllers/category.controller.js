const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");

// @desc    Get Categories
// @route   GET /api/categories
// @access  private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// @desc    Set Categories
// @route   POST /api/categories
// @access  private
const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a text field!");
  }
  const category = await Category.create({
    name: req.body.name,
    // createdBy: req.user.id,
    createdBy: req.body.createdBy,
    // modifiedBy: req.user.id,
    modifiedBy: req.body.modifiedBy,
    // status: true,
  });
  res.status(201).json({ category });
});

// @desc    Update Category
// @route   PUT /api/categories/:id
// @access  private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found!");
  }

  // check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found!");
  // }

  // make sure the logged in user matches the category user
  // if (category.modifiedBy.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized!");
  // }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ updatedCategory });
});

// @desc    Delete Category
// @route   Delete /api/categories/:id
// @access  private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found!");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // make sure the logged in user matches the category user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  await Category.deleteOne(category);
  res.status(200).json(req.params.id);
});

module.exports = {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory,
};

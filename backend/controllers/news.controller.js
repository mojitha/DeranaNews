const asyncHandler = require("express-async-handler");
const News = require("../models/news.model");

// @desc    Get News
// @route   GET /api/news
// @access  private
const getNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  res.status(200).json({ news });
});

// @desc    Set News
// @route   POST /api/news
// @access  private
const setNews = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a text field!");
  }
  const news = await News.create({
    title: req.body.title,
    createdBy: req.user.id,
    modifiedBy: req.user.id,
    images: req.body.images,
    category: req.body.category,
    status: true,
    body: req.body.body,
  });
  res.status(201).json({ news });
});

// @desc    Update News
// @route   PUT /api/news/:id
// @access  private
const updateNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(400);
    throw new Error("News not found!");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // make sure the logged in user matches the news user
  if (news.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedNews });
});

// @desc    Delete News
// @route   Delete /api/news/:id
// @access  private
const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(400);
    throw new Error("News not found!");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found!");
  }

  // make sure the logged in user matches the news user
  if (news.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  await News.deleteOne(news);
  res.status(200).json(req.params.id);
});

module.exports = {
  getNews,
  setNews,
  updateNews,
  deleteNews,
};

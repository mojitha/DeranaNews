const express = require("express");
const router = express.Router();
const {
  getNews,
  setNews,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/").get(protect, getNews).post(protect, setNews);

router.route("/:id").put(protect, updateNews).delete(protect, deleteNews);

module.exports = router;

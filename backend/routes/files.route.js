const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const filesController = require("../controllers/files.controller");

router.route("/:isMultiple").post(protect, filesController.uploadFiles);

module.exports = router;

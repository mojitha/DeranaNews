const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/:id", protect, updateUser);

module.exports = router;

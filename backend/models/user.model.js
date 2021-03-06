const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: true,
    },
    isEditor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    email: {
      type: String,
      required: [true, "Please add a email!"],
    },
    password: {
      type: String,
      required: [true, "Please add a password!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

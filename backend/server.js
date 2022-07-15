const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { errorHandler } = require("./middleware/error.middleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

// connect db
connectDB();

// initialize app
const app = express();

// cors policy
app.use(cors());

// configure request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ createParentPath: true }));

// configure routes
app.use("/api/categories", require("./routes/categories.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/files", require("./routes/files.route"));

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(
        path.resolve(__dirname, "../", "frontend", "build", "index.html")
      );
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).send("Please set to production");
  });
}

// error middleware
app.use(errorHandler);

// listen to requests
app.listen(port, () => console.log(`server started on port ${port}`));

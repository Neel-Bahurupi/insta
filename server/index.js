require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./api/routes/authRoutes");
const storyRoutes = require("./api/routes/storyRoutes");
const BookmarkRoutes = require("./api/routes/bookmarkRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", storyRoutes);
app.use("/save", BookmarkRoutes);

app.get("/", (req, res) => {
  res.json("server started");
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("failed to connect", err));

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});

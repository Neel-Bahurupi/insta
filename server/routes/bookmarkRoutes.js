const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authMiddleware");
const {
  addtoBookmark,
  getBookmarks,
  // removeBookmarked,
} = require("../controllers/bookmarkController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/bookmarks", authMiddleware, addtoBookmark);
router.get("/bookmarks/:username", authMiddleware, getBookmarks);
// router.delete("/bookmarks/:bookmarkId", authMiddleware, removeBookmarked);

module.exports = router;

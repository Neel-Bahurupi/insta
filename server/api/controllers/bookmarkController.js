const Bookmark = require("../models/BookmarkModel");
const User = require("../models/userModel");

const addtoBookmark = async (req, res) => {
  try {
    const { storyId } = req.body;
    const username = req.username;
    let user = await User.findOne({ username });

    const bookmark = new Bookmark({ user: username, story: storyId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const username = req.username;
    const bookmarks = await Bookmark.find({ user: username }).populate("story");
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const removeBookmarked = async (req, res) => {
//   const { bookmarkId } = req.params;

//   try {
//     await Bookmark.findByIdAndDelete(bookmarkId);
//     res.json({ message: "Bookmark deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting bookmark:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  addtoBookmark,
  getBookmarks,
  // removeBookmarked,
};

const express = require("express");
const router = express.Router();

const {
  deleteStory,
  createStory,
  getStoryById,

  // getStory,
  // updateStory,
  getAllStories,
} = require("../controllers/storyController");
router.post("/story", createStory);
// router.get("/story", getStory);
router.delete("/story/:id", deleteStory);
// router.put("/story/:storyId", authentication, updateStory);
router.get("/allstory", getAllStories);
router.get("/story/:id", getStoryById);

module.exports = router;

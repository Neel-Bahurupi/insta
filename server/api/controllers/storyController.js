const Story = require("../models/storyModel");

// const createStory = async (req, res) => {
//   const { storyId, heading, description, imageUrl, category, user } = req.body;
//   const found = await Story.find({ storyId });

//   if (!heading || !description || !imageUrl || !category || !user) {
//     return res.json({ error: "All info needed" });
//   }
//   if (!found.length) {
//     try {
//       await Story.create({
//         storyId,
//         heading,
//         description,
//         imageUrl,
//         category,
//         user,
//       });
//       const createdStory = await Story.find({ storyId });
//       if (createdStory.length < 3) {
//         return res.json({
//           error: "Minimum 3 slides required",
//         });
//       }
//       return res.json({
//         status: "Success",
//         iteration: 0,
//         storyId: storyId,
//       });
//     } catch (err) {
//       return res.json({ error: err });
//     }
//   } else {
//     try {
//       const iteration = found[found.length - 1].iteration;
//       if (iteration >= 6) {
//         return res.json({
//           error: "Max 6 allowed",
//         });
//       }
//       await Story.create({
//         storyId,
//         heading,
//         description,
//         imageUrl,
//         category,
//         iteration: iteration + 1,
//         user,
//       });
//       return res.json({
//         storyId: storyId,
//         status: "Success",
//         iteration: iteration + 1,
//       });
//     } catch (err) {
//       return res.json({ error: err });
//     }
//   }
// };
const createStory = async (req, res) => {
  const { storyId, slides, user } = req.body;

  if (!storyId || !slides || !user) {
    return res
      .status(400)
      .json({ error: "Story ID, slides, and user are required" });
  }

  if (slides.length < 3) {
    return res.status(400).json({ error: "Minimum 3 slides required" });
  }

  try {
    // Check if a story with the same ID already exists
    const existingStory = await Story.findOne({ storyId });

    if (existingStory) {
      return res
        .status(400)
        .json({ error: "Story with the same ID already exists" });
    }

    // Create the story
    await Story.create({ storyId, slides, user });

    return res.status(201).json({ status: "Success", storyId });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", error });
  }
};

// const getStory = async (req, res) => {
//   try {
//     const storyId = req.params.storyId;
//     const category = req.query.category;
//     if (category) {
//       const found = await Story.find({ category }).sort({ _id: -1 });
//       return res.json(found);
//     }
//     if (storyId == "all") {
//       const found = await Story.find().sort({ _id: -1 });
//       return res.json(found);
//     }
//     const found = await Story.find({ storyId }).sort({ _id: -1 });
//     return res.json(found);
//   } catch (err) {
//     return res.json({
//       status: "FAIL",
//       error: err,
//     });
//   }
// };

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();

    return res.status(200).json(stories);
  } catch (error) {
    console.error("Error retrieving stories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// const getStory = async (req, res) => {
//   try {
//     const { storyId } = req.params;

//     // Find the story by its storyId
//     const story = await Story.findOne().populate("user");

//     if (!story) {
//       return res.status(404).json({ error: "Story not found" });
//     }

//     return res.status(200).json(story);
//   } catch (error) {
//     console.error("Error retrieving story:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStory = async (req, res) => {
  try {
    const deleteStory = await Story.findByIdAndDelete(req.params.id);
    res.json({
      status: "SUCCESS",
      deleteStory,
    });
  } catch (error) {
    res.json({
      status: "FAIL",
      error: error,
    });
  }
};

// const updateStory = async (req, res) => {
//   const StoryId = req.body.storyId;
//   const found = await Story.find({ storyId });
//   if (found.length > 0 && found[found.length - 1].iteration == 5) {
//     try {
//       const deleted = await Story.deleteMany({ storyId });
//     } catch (err) {
//       return res.json({ Error: "Error to delete" });
//     }
//   }
//   const { heading, description, imageUrl, category } = req.body;
//   if (!heading || !description || !imageUrl || !category) {
//     return res.json({ error: "All info needed" });
//   }
//   if (found[0] == undefined) {
//     try {
//       await Story.create({ heading, description, imageUrl, category });
//       return res.json({ Message: "Story uploaded " });
//     } catch (err) {
//       return res.json({ Error: err });
//     }
//   }
//   if (found) {
//     try {
//       const iteration = found[found.length - 1].iteration;
//       if (iteration >= 6)
//         return res.json({ Error: "Maximum 6 slides are allowed" });
//       await Story.create({
//         storyId,
//         heading,
//         description,
//         imageUrl,
//         category,
//         iteration: iteration + 1,
//       });
//       return res.json({ Message: "Story added successfully" });
//     } catch (err) {
//       return res.json({ Error: err });
//     }
//   }
// };

module.exports = {
  createStory,
  getStoryById,
  // getStory,
  deleteStory,
  // updateStory,
  getAllStories,
};

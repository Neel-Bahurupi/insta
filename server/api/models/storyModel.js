const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  slides: [
    {
      //  storyId: {
      //     type: Number,
      //     default: 0,
      //   }
      heading: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageURL: {
        type: String,
        // required: true,
      },
      category: {
        type: String,
        enum: ["food", "health and fitness", "travel", "movies", "education"],
        required: true,
      },
    },
  ],
  storyId: {
    type: Number,
    default: 0,
  },

  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  likes: {
    type: [String],
    default: [],
  },
});
const Story = mongoose.model("Story", storySchema);

module.exports = Story;

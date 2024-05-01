const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: { type: String, required: true },
  story: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Story" },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);

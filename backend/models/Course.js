const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: [String],
  createdBy: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Course", CourseSchema);

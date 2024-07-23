const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    options: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("topic", topicSchema);

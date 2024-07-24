const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    topicScore: {
      type: [{
        topic: String,
        score: Number
      }],
      default: [
        {topic:"javascript",score:0},
        {topic:"java",score:0},
        {topic:"python",score:0}
      ],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);

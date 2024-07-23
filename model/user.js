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
      default: [],
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);

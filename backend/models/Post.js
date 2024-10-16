const { default: mongoose } = require("mongoose");

const PostScheme = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostScheme);

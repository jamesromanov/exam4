const mongoose = require("mongoose");

let post = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post nomini berish majburiy!"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content nomini berish majburiy!"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Author berish majburiy!"],
      ref: "authors",
    },
    image: { type: String, default: "none" },
    deleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

let Post = mongoose.model("posts", post);

module.exports = Post;

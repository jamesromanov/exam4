const mongoose = require("mongoose");

let post = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    image: { type: String, default: "none" },
    role: { type: String, enum: ["author", "user"], default: "user" },
    active: { type: Boolean, default: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

let Post = mongoose.model("posts", post);

module.exports = Post;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

let author = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ism kiritish majburiy!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email kiritish majburiy!"],
      validate: [validator.isEmail, "Email xato kiritildi!"],
    },
    password: {
      type: String,
      required: [true, "Password kiritish majburiy "],
      select: false,
      validate: [validator.isStrongPassword, "Password kuchli bolishi kerak!"],
    },
    role: {
      type: String,
      enum: ["author", "user"],
      default: "author",
      select: false,
    },
    isActive: { type: Boolean, default: true, select: false },
    refreshToken: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

author.pre("save", async function (next) {
  let password = this.password;
  this.password = await bcrypt.hash(password, 12);
});
author.virtual("posts", {
  ref: "posts",
  localField: "_id",
  foreignField: "author",
});
let Author = mongoose.model("authors", author);

module.exports = Author;

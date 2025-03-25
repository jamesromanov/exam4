const mongoose = require("mongoose");
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
      validate: [validator.isStrongPassword, "Password kuchli bolishi kerak!"],
    },
    role: { type: String, enum: ["author", "user"], default: "author" },
    isActive: { type: Boolean, default: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

let Author = mongoose.model("authors", author);

module.exports = Author;

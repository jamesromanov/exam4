const mongoose = require("mongoose");
const errorHandler = require("../utils/errorHandler");
require("dotenv").config();

const connectDb = errorHandler(async () => {
  await mongoose
    .connect(
      process.env.DATABASE.replace("<db_password>", process.env.PASSWORD) ??
        process.env.DATABASE
    )
    .then(() => {
      console.log("MongoDb connected succesfully!");
    });
});

module.exports = { connectDb };

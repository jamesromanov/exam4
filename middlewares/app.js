const express = require("express");
const morgan = require("morgan");
const mid = require("../utils/error");
const cookieParser = require("cookie-parser");

const authRouter = require("../routes/auth.router");
const authorRouter = require("../routes/author.route");
const postRouter = require("../routes/post.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(mid);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
app.use("/auth", authRouter);
app.use("/users", authorRouter);
app.use("/posts", postRouter);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const mid = require("../utils/error");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.router");
const authorRouter = require("../routes/auther.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mid);
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", authorRouter);

module.exports = app;

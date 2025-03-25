const express = require("express");
const morgan = require("morgan");
const mid = require("../utils/error");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mid);
app.use(morgan("dev"));

module.exports = app;

const express = require("express");
const authorController = require("../controllers/author.controller");
const protector = require("../middlewares/protector");
const checkRole = require("../middlewares/checkrole");

const authorRouter = express.Router();

authorRouter
  .route("/me")
  .get(protector, checkRole(["author"]), authorController.getAuthor);

module.exports = authorRouter;

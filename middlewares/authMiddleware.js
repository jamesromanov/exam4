const jwt = require("jsonwebtoken");
const Author = require("../models/author.model");
const { response } = require("../utils/response");
require("dotenv").config();

const protector = async (req, res, next) => {
  try {
    let tokenChecking = req.headers.authorization;
    if (!tokenChecking || !tokenChecking.startsWith("Bearer"))
      response(res, "Token olinmadi!", 401);
    let token = tokenChecking.split(" ")[1];
    let checking = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
    let author = await Author.findById(checking.id).select(
      "role email isActive"
    );
    if (!author || !author.isActive) response(res, "Token olinmadi!", 401);
    req.author = author;
    next();
  } catch (error) {
    response(res, error.message, 401);
  }
};

module.exports = protector;

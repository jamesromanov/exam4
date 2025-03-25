const Author = require("../models/author.model");
const { response } = require("../utils/response");

const checkOwner = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    response(res, error.message, 401);
  }
};

module.exports = checkOwner;

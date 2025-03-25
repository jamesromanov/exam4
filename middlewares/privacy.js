const jwt = require("jsonwebtoken");
const { response } = require("../utils/response");
require("dotenv").config();

const private = async (req, res, next) => {
  try {
    let tokenChecking = req.headers.authorization;
    let token = tokenChecking.split(" ")[1];
    let checking = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
    if (req.params.id !== checking.id)
      throw new Error("Malumotlar ozgartirish huquqiga ega emassiz!");
    next();
  } catch (error) {
    response(res, error.message, 401);
  }
};

module.exports = private;

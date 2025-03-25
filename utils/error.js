const { response } = require("../utils/response");

const mid = (err, req, res, next) => {
  response(res, "middleware error:" + err.message, 501);
};

module.exports = mid;

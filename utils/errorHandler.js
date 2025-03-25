const { response } = require("../utils/response");

const errorHandler = (fuct) => {
  return (req, res, next) => {
    fuct(req, res, next).catch((err) => {
      response(res, err.message, 500);
    });
  };
};

module.exports = errorHandler;

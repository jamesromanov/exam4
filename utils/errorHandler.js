const { response } = require("../utils/response");

const errorHandler = (fuct) => {
  return (req, res, next) => {
    fuct(req, res, next).catch((err) => {
      response(res, err.message, 501);
    });
  };
};

module.exports = errorHandler;

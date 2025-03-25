const { response } = require("../utils/response");

const checkRole = (role) => {
  try {
    return function (req, res, next) {
      if (!role.includes(req.author.role))
        throw new Error("Sizda adminlik huquqi yoq!");
      next();
    };
  } catch (error) {
    response(res, error.message, 403);
  }
};

module.exports = checkRole;

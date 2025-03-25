const fs = require("fs");

const saveLogs = (req, res, next) => {
  let time = new Date();
  fs.appendFileSync("../utils/logs.txt", {
    method: req.method,
    date: toLocaleDateString(),
    time: time.toLocaleTimeString(),
  });
  next();
};

module.exports = saveLogs;

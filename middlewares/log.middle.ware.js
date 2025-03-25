const fs = require("fs");

const saveLogs = (req, res, next) => {
  let time = new Date();
  fs.appendFileSync(
    "./utils/logs.txt",
    `
      -------------------------
      request: ${req.originalUrl},
      method: ${req.method},
      date: ${time.toLocaleDateString()},
      time:${time.toLocaleTimeString()},
      -------------------------\n
      `
  );
  next();
};

module.exports = saveLogs;

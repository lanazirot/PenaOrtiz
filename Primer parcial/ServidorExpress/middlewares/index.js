const fs = require("fs");

const printHelloWorld = (req, res, next) => {
  const headers = req.rawHeaders.join(" ") + "\n";
  fs.appendFile("./logs/requests.log", headers, (err) => {
    if (err) console.log("Error when saving data");
  });
  next();
};

const checkId = (req, res, next) => {
  const { id } = req.params;
  if (id > 500)
    res
      .status(405)
      .json({ message: "ID should be less than 500", error: "Less500" });
};

module.exports = { printHelloWorld, checkId };

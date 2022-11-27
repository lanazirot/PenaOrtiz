require("dotenv").config();

const sql = require("mssql");
const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index.js");
const runSwagger = require("./swagger/swagger.js");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
routerApi(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(port);
  runSwagger(app);
}

module.exports = app;

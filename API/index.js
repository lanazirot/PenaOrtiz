require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index.js");
const runSwagger = require("./swagger/swagger.js");
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(fileUpload());
routerApi(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(port);
  runSwagger(app);
}

module.exports = app;

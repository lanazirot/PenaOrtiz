require('dotenv').config();

const sql = require("mssql");
const express = require("express");
const cors = require("cors")
const routerApi = require('./routes/index.js');
const appPool = new sql.ConnectionPool(process.env.CONNECTION);

const app = express();
const port = process.env.PORT || 3000;

appPool
  .connect()
  .then((pool) => {
    routerApi(app)
    app.locals.db = pool;
    app.use(cors({ origin: "*" }));
    app.listen(port);
  })
  .catch(console.error);

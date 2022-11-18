require("dotenv").config();


const sql = require("mssql");
const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index.js");
const runSwagger = require("./swagger/swagger.js");

const appPool = new sql.ConnectionPool(process.env.CONNECTION);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 3000;

appPool
  .connect()
  .then((pool) => {
    routerApi(app);
    app.locals.db = pool;
    runSwagger(app)
    app.listen(port);
  })
  .catch(console.error);

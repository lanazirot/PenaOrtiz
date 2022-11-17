require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const sql = require("mssql");
const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index.js");

const appPool = new sql.ConnectionPool(process.env.CONNECTION);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tienda API",
      version: "1.0.6",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"], 
};

const openapiSpecification = swaggerJsdoc(options);

appPool
  .connect()
  .then((pool) => {
    routerApi(app);
    app.locals.db = pool;
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openapiSpecification)
    );
    app.listen(port);
  })
  .catch(console.error);

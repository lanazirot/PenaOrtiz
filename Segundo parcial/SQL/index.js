const sql = require("mssql");
const express = require("express");
const { getAllCustomers, findById } = require("./routes/customersRoute.js");
const appPool = new sql.ConnectionPool(process.env.CONNECTION);

const app = express();

const router = express.Router();
router.get("/customers", getAllCustomers);
router.get("/customers/:id", findById)


appPool
  .connect()
  .then((pool) => {
    app.locals.db = pool;
    app.use(router);
    app.use(cors({ origin: "*" }));
    app.listen(process.env.PORT);
  })
  .catch(console.error);

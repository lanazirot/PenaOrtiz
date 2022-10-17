const express = require("express");
const customersRouter = express.Router();

customersRouter.get("/", (req, res, next) => {
  const { top = 100, orderBy = "CustomerID" } = req.query;
  req.app.locals.db.query(
    `SELECT TOP ${top} * FROM SalesLT.Customer ORDER BY ${orderBy}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Data has been found", data: query.recordset });
      }
    }
  );
});

customersRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.query(
    `SELECT TOP 1 * FROM SalesLT.Customer WHERE CustomerID = ${id}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Data has been found", data: query.recordset });
      }
    }
  );
});

customersRouter.post("/", (req, res, next) => {
  
});

module.exports = customersRouter;

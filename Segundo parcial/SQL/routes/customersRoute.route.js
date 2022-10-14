const express = require("express");
const customersRouter = express.Router();

customersRouter.get("/", (req, res, next) => {
  const { top = 100, orderBy = 'CustomerID'} = req.query
  req.app.locals.db.query(`SELECT TOP ${top} * FROM Sales.Customer ORDER BY ${orderBy}`, (err, recordset) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Unexpected error on server side", data: err });
    }else{
      res.status(200).json({ message: "Recordset found", data: recordset });
    }
  });
});

module.exports = customersRouter;

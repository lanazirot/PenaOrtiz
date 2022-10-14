const getAllCustomers = (req, res) => {
  req.locals.db.query("SELECT * FROM SalesLT.Customers", (err, recordset) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Unexpected error on server side", data: err });
      return;
    }
    res.status(200).json({ message: "Recordset found", data: recordset });
  });
};

const findById = (req, res) => {
  const { id } = req.params
  if (!id){
    res.status(400).json({message: 'ID is required when querying a customer', data: null})
  }
  req.locals.db.query("SELECT * FROM SalesLT.Customers WHERE CustomerID = id", (err, recordset) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Unexpected error on server side", data: err });
      return;
    }
    res.status(200).json({ message: "Customer found", data: recordset });
  });
};

module.exports = { getAllCustomers, findById };

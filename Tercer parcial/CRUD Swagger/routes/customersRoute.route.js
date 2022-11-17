const express = require("express");
const customersRouter = express.Router();
const {
  validatePatchCustomer,
  validatePostCustomer,
} = require("../middlewares/customer/index.js");
/**
 * @swagger
 * /:
 *   get:
 *     description: Obtener todos los clientes
 *     responses:
 *       200:
 *         description: Retorna una lista de todos los clientes
 *       500:
 *         description: Error del servidor
 */
customersRouter.get("/", (req, res, next) => {
  const { top = 100, orderBy = "id" } = req.query;
  req.app.locals.db.query(
    `SELECT TOP ${top} * FROM Clientes ORDER BY ${orderBy}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Data has been found", data: query.recordset });
      }
    }
  );
});
/**
 * @swagger
 * /id:
 *   get:
 *     description: Obtiene la informacion de un cliente por su ID
 *     responses:
 *       200:
 *         description: Retorna un objeto tipo cliente y sus propiedades
 *       500:
 *         description: Error del servidor
 */
customersRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.query(
    `SELECT TOP 1 * FROM Clientes WHERE id = ${id}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Data has been found", data: query.recordset[0] });
      }
    }
  );
});

customersRouter.post("/", validatePostCustomer, (req, res, next) => {
  const { nombre, apellidos, direccion, numeroMembresia } = req.newUser;
  const { db } = req.app.locals;
  db.query(
    `INSERT INTO Clientes (nombre, apellidos, direccion, numeroMembresia) VALUES ('${nombre}', '${apellidos}','${direccion}','${numeroMembresia}') `,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Customer has been created", data: query });
      }
    }
  );
});

customersRouter.patch("/:id", validatePatchCustomer, (req, res, next) => {
  const { nombre, apellidos, direccion } = req.newUser;
  const { id } = req.params;
  const { db } = req.app.locals;

  db.query(
    `UPDATE Clientes SET nombre = '${nombre}', apellidos = '${apellidos}', direccion = '${direccion}' WHERE id = ${id}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Customer has been updated", data: query });
      }
    }
  );
});

customersRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const { db } = req.app.locals;
  if (!id) {
    res.status(400).json({
      message: "Client ID is required when trying to delete a customer",
      data: null,
    });
  } else {
    db.query(`DELETE TOP (1) FROM Clientes WHERE id = ${id}`, (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Customer has been deleted.", data: query });
      }
    });
  }
});

module.exports = customersRouter;

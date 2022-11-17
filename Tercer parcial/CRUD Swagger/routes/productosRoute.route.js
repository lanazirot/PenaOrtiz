const express = require("express");
const productosRouter = express.Router();
const {
  validatePatchProduct,
  validatePostProduct
} = require("../middlewares/product/index.js");
/**
 * @swagger
 * /:
 *   get:
 *     description: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Retorna una lista de todos los productos
 *       500:
 *         description: Error del servidor
 */
productosRouter.get("/", (req, res, next) => {
  const { top = 100, orderBy = "id" } = req.query;
  req.app.locals.db.query(
    `SELECT TOP ${top} * FROM Productos ORDER BY ${orderBy}`,
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
 * Find customer given the ID
 */
productosRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.query(
    `SELECT TOP 1 * FROM Productos WHERE id = ${id}`,
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
/**
 * Create a customer given a body from the request
 */
productosRouter.post("/", validatePostProduct, (req, res, next) => {
  const { nombre, precio } = req.newUser;
  const { db } = req.app.locals;
  db.query(
    `INSERT INTO Productos (nombre, precio) VALUES ('${nombre}',${precio}) `,
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
/**
 * Update customer given ID
 */
productosRouter.patch("/:id", validatePatchProduct, (req, res, next) => {
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
/**
 * Delete a customer given the id
 */
productosRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const { db } = req.app.locals;
  if (!id) {
    res.status(400).json({
      message: "Product ID is required when trying to delete a customer",
      data: null,
    });
  } else {
    db.query(`DELETE TOP (1) FROM Productos WHERE id = ${id}`, (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Product has been deleted.", data: query });
      }
    });
  }
});

module.exports = productosRouter;

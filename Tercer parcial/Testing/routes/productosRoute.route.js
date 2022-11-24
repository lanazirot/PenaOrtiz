const express = require("express");
const productosRouter = express.Router();
const {
  validatePatchProduct,
  validatePostProduct
} = require("../middlewares/product/index.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: Nombre del producto
 *         precio:
 *           type: Number
 *       required:
 *          - nombre
 *          - precio
 *       example:
 *          nombre: Computadora
 *          precio: 1500.50
 */

/**
 * @swagger
 * /api/productos/:
 *   get:
 *     summary: Listar productos
 *     operationId: getProductos
 *     tags:
 *        - Productos
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
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener info del producto por ID
 *     operationID: getProductoById
 *     tags:
 *        - Productos
 *     description: Obtener la informacion de un producto
 *     responses:
 *       200:
 *         description: Retorna la informacion de un producto en formato JSON
 *       500:
 *         description: Error del servidor
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del producto
 *        schema:
 *          type: string
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
 * @swagger
 * /api/productos/:
 *   post:
 *     tags:
 *        - Productos
 *     description: Crear un producto
 *     operationId: crearProducto
 *     summary: Crear un producto por body
 *     responses:
 *       200:
 *         description: Si el producto  fue creado exitosamente
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: Producto
 *          in: body
 *          description: Modelo de producto por crear
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Product'
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
 * @swagger
 * /api/productos/{id}:
 *   patch:
 *     summary: Actualiza un producto
 *     operationID: updateProducto
 *     tags:
 *        - Productos
 *     description: Actualiza un producto
 *     responses:
 *       200:
 *         description: Retorna el numero de queries afectadas (1) si el producto fue modificado
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del producto
 *          schema:
 *            type: string
 *        - name: Product
 *          in: body
 *          description: Modelo de producto por actualizar
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Product'
 */
productosRouter.patch("/:id", validatePatchProduct, (req, res, next) => {
  const { nombre, precio } = req.newProduct;
  const { id } = req.params;
  const { db } = req.app.locals;

  db.query(
    `UPDATE Productos SET nombre = '${nombre}', precio = ${precio} WHERE id = ${id}`,
    (err, query) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Unexpected error on server side", data: err });
      } else {
        res
          .status(200)
          .json({ message: "Product has been updated", data: query });
      }
    }
  );
});
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     operationID: deleteProductoById
 *     tags:
 *        - Productos
 *     description: Eliminar un producto
 *     responses:
 *       200:
 *         description: Retorna la informacion del producto eliminado
 *       500:
 *         description: Error del servidor  
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

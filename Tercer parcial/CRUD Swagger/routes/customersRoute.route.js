const express = require("express");
const customersRouter = express.Router();
const {
  validatePatchCustomer,
  validatePostCustomer,
} = require("../middlewares/customer/index.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: Nombre del usuario
 *         apellidos:
 *           type: string
 *           description: Apellidos del usuario
 *         direccion:
 *           type: String
 *         numeroMembresia:
 *           type: String
 *           description: Numero de membresia del usuario generado en la tienda
 *       required:
 *          - nombre
 *          - apellidos
 *          - direccion
 *          - numeroMembresia
 *       example:
 *          nombre: Alan
 *          apellidos: Peña Ortiz
 *          direccion: Juarez 1234
 *          numeroMembresia: 10183820s
 */


/**
 * @swagger
 * /api/clientes/:
 *   get:
 *     summary: Listar clientes
 *     operationId: getClientes
 *     tags:
 *        - Clientes
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
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener info del cliente por ID
 *     operationID: getClienteById
 *     tags:
 *        - Clientes
 *     description: Obtener la informacion de un cliente
 *     responses:
 *       200:
 *         description: Retorna la informacion de un cliente en formato JSON
 *       500:
 *         description: Error del servidor
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del cliente
 *        schema:
 *          type: string
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
/**
 * @swagger
 * /api/clientes/:
 *   post:
 *     tags:
 *        - Clientes
 *     description: Crear un cliente
 *     operationId: crearCliente
 *     summary: Crear un cliente por body
 *     responses:
 *       200:
 *         description: Si el cliente fue creado exitosamente
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - in: body
 *          name: Cliente
 *          description: Modelo de cliente por crear
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 */
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
/**
 * @swagger
 * /api/clientes/{id}:
 *   patch:
 *     summary: Actualiza un cliente
 *     operationID: updateCliente
 *     tags:
 *        - Clientes
 *     description: Actualiza un cliente
 *     responses:
 *       200:
 *         description: Retorna el numero de queries afectadas (1) si el cliente fue modificado
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del cliente
 *          schema:
 *            type: string
 *        - in: body
 *          name: Cliente
 *          description: Modelo de cliente por actualizar
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 */
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
/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     operationID: deleteClienteById
 *     tags:
 *        - Clientes
 *     description: Eliminar un cliente
 *     responses:
 *       200:
 *         description: Retorna la informacion del cliente eliminado
 *       500:
 *         description: Error del servidor  
 */
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

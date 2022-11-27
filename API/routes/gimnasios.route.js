const express = require("express");
const prismaInstance = require("../db/prisma");
const gimnasiosRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Gimnasio:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: Nombre del gimnasio
 *         direccion:
 *           type: string
 *           description: Direccion del gimnasio
 *       required:
 *          - nombre
 *          - direccion
 *       example:
 *          nombre: TKD Morelos
 *          direccion: Morelos 1234 Col. Juarez
 */

/**
 * @swagger
 * /api/gimnasios/:
 *   get:
 *     summary: Listar los gimnasios
 *     operationId: getGimnasios
 *     tags:
 *        - Gimnasios
 *     description: Obtener todos los gimnasios
 *     responses:
 *       200:
 *         description: Retorna una lista de todos los gimnasios
 *       500:
 *         description: Error del servidor
 */
gimnasiosRouter.get("/", async (req, res, next) => {
  //List all gimnasios using prisma
  try {
    const gimnasios = await prismaInstance.gimnasios.findMany();
    res.status(200).json(gimnasios);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * @swagger
 * /api/gimnasios/{id}:
 *   get:
 *     summary: Obtener info del gimnasio por ID
 *     operationID: getGimnasioById
 *     tags:
 *        - Gimnasios
 *     description: Obtener la informacion de un gimnasio
 *     responses:
 *       200:
 *         description: Retorna la informacion de un gimnasio en formato JSON
 *       500:
 *         description: Error del servidor
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del gimnasio
 *        schema:
 *          type: string
 */
gimnasiosRouter.get("/:id", (req, res, next) => {
  //Get gimnasio by id using prisma
  const { id } = req.params;
  prismaInstance.gimnasios
    .findUnique({
      where: {
        id: parseInt(id),
      },
    })
    .then((gimnasio) => {
      res.status(200).json(gimnasio);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
/**
 * @swagger
 * /api/gimnasios/:
 *   post:
 *     tags:
 *        - Gimnasios
 *     description: Crear un gimnasio
 *     operationId: crearGimnasio
 *     summary: Crear un gimnasio por body
 *     responses:
 *       200:
 *         description: Si el gimnasio fue creado exitosamente
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - in: body
 *          name: Gimnasio
 *          description: Modelo de gimnasio por crear
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Gimnasio'
 */
gimnasiosRouter.post("/", (req, res, next) => {
  //Create gimnasio using prisma
  prismaInstance.gimnasios
    .create({
      data: req.body,
    })
    .then((gimnasio) => {
      res.status(200).json(gimnasio);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
/**
 * @swagger
 * /api/gimnasios/{id}:
 *   patch:
 *     summary: Actualiza un gimnasio
 *     operationID: updateGimnasio
 *     tags:
 *        - Gimnasios
 *     description: Actualiza un gimnasio
 *     responses:
 *       200:
 *         description: Retorna la informacion del gimnasio actualizado
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del gimnasio
 *          schema:
 *            type: string
 *        - in: body
 *          name: Gimnasio
 *          description: Modelo de gimnasio por actualizar
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Gimnasio'
 */
gimnasiosRouter.patch("/:id", (req, res, next) => {
  //Update gimnasio using prisma
  const { id } = req.params;
  prismaInstance.gimnasios
    .update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    })
    .then((gimnasio) => {
      res.status(200).json(gimnasio);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
/**
 * @swagger
 * /api/gimnasios/{id}:
 *   delete:
 *     summary: Eliminar un gimnasio
 *     operationID: deleteGimnasio
 *     tags:
 *        - Gimnasios
 *     description: Eliminar un gimnasio
 *     responses:
 *       200:
 *         description: Retorna la informacion del gimnasio eliminado
 *       500:
 *         description: Error del servidor
 */
gimnasiosRouter.delete("/:id", async (req, res, next) => {
  //Delete gimnasio using prisma
  const { id } = req.params;
  try {
    const gimnasio = await prismaInstance.gimnasios.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(gimnasio);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = gimnasiosRouter;

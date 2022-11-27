const express = require("express");
const prismaInstance = require("../db/prisma");
const estudiantesRouter = express.Router();

const validatorSchema = require("../middlewares/validatorSchema");
const {
  estudianteSchema,
  updateEstudianteSchema,
} = require("../schemas/estudiantes");

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: Nombre del estudiante
 *         direccion:
 *           type: String
 *           description: Dirección del estudiante
 *         peso:
 *           type: Number
 *           description: Peso del estudiante en Kgs
 *         cinta:
 *            type: String
 *            description: Cinta del estudiante
 *         id_gimnasio:
 *           type: Number
 *           description: Id del gimnasio al que pertenece el estudiante
 *       required:
 *          - nombre
 *          - direccion
 *          - peso
 *          - cinta
 *       example:
 *          nombre: Alan Peña Ortiz
 *          peso: 90.0
 *          direccion: Calle 1 # 2 - 3
 *          cinta: Azul
 *          id_gimnasio: 1
 */

/**
 * @swagger
 * /api/estudiantes/:
 *   get:
 *     summary: Listar estudiantes
 *     operationId: getEstudiantes
 *     tags:
 *        - Estudiantes
 *     description: Obtener todos los estudiantes
 *     responses:
 *       200:
 *         description: Retorna una lista de todos los estudiantes
 *       500:
 *         description: Error del servidor
 */
estudiantesRouter.get("/", async (req, res, next) => {
  //List all estudiantes using prisma
  try {
    const estudiantes = await prismaInstance.estudiantes.findMany();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/estudiantes/{id}:
 *   get:
 *     summary: Obtener info del estudiante por ID
 *     operationID: getEstudianteById
 *     tags:
 *        - Estudiantes
 *     description: Obtener la informacion de un estudiante
 *     responses:
 *       200:
 *         description: Retorna la informacion de un estudiante en formato JSON
 *       500:
 *         description: Error del servidor
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID del estudiante
 *        schema:
 *          type: string
 */
estudiantesRouter.get("/:id", async (req, res, next) => {
  //Get an estudiante by id using prisma
  try {
    const estudiante = await prismaInstance.estudiantes.findUnique({
      where: {
        id_estudiante: Number(req.params.id),
      },
    });
    if (estudiante) {
      res.status(200).json(estudiante);
    } else {
      res.status(404).json({ error: "Estudiante no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
/**
 * @swagger
 * /api/estudiantes/:
 *   post:
 *     tags:
 *        - Estudiantes
 *     description: Crear un estudiante
 *     operationId: crearEstudiante
 *     summary: Crear un estudiante por body
 *     responses:
 *       200:
 *         description: Si el estudiante fue creado exitosamente
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: Estudiante
 *          in: body
 *          description: Modelo de estudiante por crear
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Estudiante'
 */
estudiantesRouter.post(
  "/",
  validatorSchema(estudianteSchema, "body"),
  async (req, res, next) => {
    //Create an estudiante using prisma
    try {
      const estudiante = await prismaInstance.estudiantes.create({
        data: req.body,
      });
      res.status(200).json(estudiante);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
/**
 * @swagger
 * /api/estudiantes/{id}:
 *   patch:
 *     summary: Actualiza un estudiante dado su ID
 *     operationID: updateEstudiante
 *     tags:
 *        - Estudiantes
 *     description: Actualiza un estudiante
 *     responses:
 *       200:
 *         description: Retorna la informacion del estudiante actualizado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID del estudiante
 *          schema:
 *            type: string
 *        - name: Estudiante
 *          in: body
 *          description: Modelo del estudiante por actualizar
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Estudiante'
 */
estudiantesRouter.patch(
  "/:id",
  validatorSchema(updateEstudianteSchema, "body"),
  async (req, res, next) => {
    //Update an estudiante by id using prisma
    const { id } = req.params;
    try {
      //Check if estudiante exists before updating
      const estudiante = await prismaInstance.estudiantes.findUnique({
        where: {
          id_estudiante: Number(id),
        },
      });
      if (estudiante) {
        const updatedEstudiante = await prismaInstance.estudiantes.update({
          where: {
            id_estudiante: Number(id),
          },
          data: req.body,
        });
        res.status(200).json(updatedEstudiante);
      } else {
        res.status(404).json({ error: "Estudiante no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
/**
 * @swagger
 * /api/estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     operationID: deleteEstudiante
 *     tags:
 *        - Estudiantes
 *     description: Eliminar un estudiante
 *     responses:
 *       200:
 *         description: Retorna la informacion del estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
estudiantesRouter.delete("/:id", async (req, res, next) => {
  //Delete an estudiante by id using prisma
  try {
    const estudiante = await prismaInstance.estudiantes.delete({
      where: {
        id_estudiante: Number(req.params.id),
      },
    });
    res.status(200).json(estudiante);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Estudiante no encontrado" });
    } else {
      res.status(500).json(error);
    }
  }
});
module.exports = estudiantesRouter;

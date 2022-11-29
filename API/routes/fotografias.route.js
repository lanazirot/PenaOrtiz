const express = require("express");
const prismaInstance = require("../db/prisma");
const fotografiasRouter = express.Router();
const path = require("path");

/**
 * @swagger
 * components:
 *   schemas:
 *     Fotografia:
 *       type: object
 *       properties:
 *         url_path:
 *           type: String
 *           description: URL de la fotografia
 *         referencia:
 *           type: String
 *           description: Referencia de la fotografia
 *       example:
 *          url_path: /uploads/imagen.jpg
 *          referencia: Estudiante
 */

/**
 * @swagger
 * /api/fotografias/:
 *   post:
 *     tags:
 *        - Fotografias
 *     description: Crear una fotografia
 *     operationId: crearFotografia
 *     summary: Subir una fotografia al sistema
 *     responses:
 *       200:
 *         description: Si la fotografia se subio correctamente
 *       500:
 *         description: Error del servidor
 *     consumes:
 *      - multipart/form-data
 *     parameters:
 *      - name: image
 *        in: formData
 *        required: true
 *        description: Archivo de la fotografia a subir en formato JPG
 *        schema:
 *          name: image
 *          type: file
 */
fotografiasRouter.post("/", async (req, res, next) => {
  const { image } = req.files;
  const { referencia = "default" } = req.query;
  if (!image) {
    return res.status(400).json({
      message: "No se ha seleccionado ninguna imagen",
    });
  }
  try {
    const ruta = path.join(__dirname, "..", "uploads", image.name + new Date().getTime() + ".jpg");
    const newFotografia = await prismaInstance.fotografias.create({
        data: {
            referencia,
            url_path: ruta,
        },
    });
    image.mv(ruta);
    res.status(201).json(newFotografia);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/fotografias/:
 *   get:
 *     summary: Listar fotografias
 *     operationId: getFotografias
 *     tags:
 *        - Fotografias
 *     description: Obtener todas las fotografias
 *     responses:
 *       200:
 *         description: Retorna una lista de todas las fotografias
 *       500:
 *         description: Error del servidor
 */
fotografiasRouter.get("/", async (req, res, next) => {
  try {
    const fotografias = await prismaInstance.fotografias.findMany();
    res.status(200).json(fotografias);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /api/fotografias/{id}:
 *   get:
 *     summary: Obtener una fotografia por ID
 *     operationID: getFotografiaByID
 *     tags:
 *        - Fotografias
 *     description: Obtener una fotografia
 *     responses:
 *       200:
 *         description: Retorna una fotografia
 *       500:
 *         description: Error del servidor
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID de la fotografia
 *        schema:
 *          type: string
 */
fotografiasRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const fotografia = await prismaInstance.fotografias.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (fotografia) {
      res.status(200).sendFile(fotografia.url_path);
    } else {
      res.status(404).json({
        error: "Fotografia no encontrada",
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/fotografias/{id}:
 *   delete:
 *     summary: Eliminar una fotografia
 *     operationID: deleteFotografia
 *     tags:
 *        - Fotografias
 *     description: Eliminar una fotografia
 *     responses:
 *       200:
 *         description: Retorna la informacion de la fotografia eliminada
 *       404:
 *         description: Fotografia no encontrada
 *       500:
 *         description: Error del servidor
 */
fotografiasRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const fotografia = await prismaInstance.fotografias.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(fotografia);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({
        message: "Fotografia no encontrada",
      });
    } else {
      res.status(500).json(error);
    }
  }
});

module.exports = fotografiasRouter;



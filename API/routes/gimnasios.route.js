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
  //Check if there is a query parameter to limit the number of results
  const limit = parseInt(req.query.limit);
  //Check if there is a query parameter to offset the number of results
  const offset = parseInt(req.query.offset);
  //Check if there is a query parameter to filter the results
  const filter = req.query.filter;
  try {
    //Conditional gimnasios search query if limit and offset are not defined
    const gimnasios =
      limit && offset && filter
        ? await prismaInstance.gimnasios.findMany({
            take: limit,
            skip: offset,
            where: {
              OR: [
                {
                  nombre: {
                    contains: filter,
                  },
                },
                {
                  direccion: {
                    contains: filter,
                  },
                },
              ],
            },
          })
        : await prismaInstance.gimnasios.findMany();

    res.status(200).json(gimnasios);
  } catch (error) {
    console.log(error);
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
 *       404:
 *         description: Gimnasio no encontrado
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
        id_gimnasio: parseInt(id),
      },
    })
    .then((gimnasio) => {
      if(gimnasio){
        res.status(200).json(gimnasio);
      }else{
        res.status(404).json({message: "Gimnasio no encontrado"});
      }
    })
    .catch((error) => {
      console.log();
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
 *          nombre: Gimnasio
 *          description: Modelo de gimnasio por crear
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Gimnasio'
 */
gimnasiosRouter.post("/", async (req, res, next) => {
  //Create gimnasio using prisma
  try {
    const gimnasio = await prismaInstance.gimnasios.create({
      data: req.body
    });
    res.status(200).json(gimnasio);
  }
  catch (error) {
    res.status(500).json(error);
  }

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
gimnasiosRouter.patch("/:id", async (req, res, next) => {
  //Update gimnasio using prisma
  const { id } = req.params;
  try {
    const gimnasio = await prismaInstance.gimnasios.update({
      where: {
        id_gimnasio: parseInt(id),
      },
      data: req.body,
    });
    res.status(200).json(gimnasio);
  }
  catch (error) {
    res.status(500).json(error);
  }

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
        id_gimnasio: parseInt(id),
      },
    });
    res.status(200).json(gimnasio);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Gimnasio no encontrado" });
    }
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /api/gimnasios/{id}/estudiantes:
 *   delete:
 *     summary: Retorna los estudiantes de un gimnasio
 *     operationID: getEstudiantesByGimnasio
 *     tags:
 *        - Gimnasios
 *     description: Retorna los estudiantes de un gimnasio
 *     responses:
 *       200:
 *         description: Retorna la informacion de los estudiantes de un gimnasio
 *       500:
 *         description: Error del servidor
 */
gimnasiosRouter.get("/:id/estudiantes", async (req, res, next) => {
  //Get all estudiantes from a gimnasio using prisma
  try {
    const gimnasio = await prismaInstance.gimnasios.findUnique({
      where: {
        id_gimnasio: Number(req.params.id),
      },
      include: {
        Estudiantes: true,
      },
    });
    res.status(200).json(gimnasio.estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = gimnasiosRouter;

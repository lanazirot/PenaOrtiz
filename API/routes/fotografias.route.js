const express = require("express");
const prismaInstance = require("../db/prisma");
const fotografiasRouter = express.Router();
const path = require("path");


//Basic CRUD operations
//Create
fotografiasRouter.post("/", async (req, res, next) => {
  const { image } = req.files;
  //Get query params
  const { referencia = "default" } = req.query;

  if (!image) {
    return res.status(400).json({
      message: "No se ha seleccionado ninguna imagen",
    });
  }

  try {
    //const path = __dirname + "\\uploads\\" + image.name + new Date().getTime() + ".jpg";
    
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

//Read
fotografiasRouter.get("/", async (req, res, next) => {
  try {
    const fotografias = await prismaInstance.fotografias.findMany();
    res.status(200).json(fotografias);
  } catch (error) {
    next(error);
  }
});

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

//Delete
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
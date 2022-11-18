const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tienda API",
      version: "1.0.6",
      description:
        "Proyecto final API Documentada materia de API REST TecNM 7mo Semestre",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Alan Peña",
        url: "https://github.com/lanazirot",
      },
    },
    servers: [{ url: "http://localhost:3000", description: "Tienda API" }],
    tags: [
      {
        name: "Clientes",
        description: "Relacionado con los clientes del sistema",
      },
      {
        name: "Productos",
        description: "Relacionado con los productos del sistema",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

const runSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};

module.exports = runSwagger;

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TKD API",
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
    servers: [{ url: "http://localhost:3000", description: "TKD API" }],
    tags: [
      {
        name: "Estudiantes",
        description: "Relacionado con los estudiantes del sistema",
      },
      {
        name: "Gimnasios",
        description: "Relacionado con los gimnasios del sistema",
      },
      {
        name: "Fotografias",
        description: "Relacionado con las fotografias del sistema",
      }
    ],
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

const runSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};

module.exports = runSwagger;

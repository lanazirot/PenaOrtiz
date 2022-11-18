const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Tienda API",
        version: "1.0.6",
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'Alan Peña',
          url: 'https://github.com/lanazirot',
        },
      },
      servers: [{ url: "http://localhost:3000", description: "Tienda API" }]
    },
    apis: ["./routes/*.js"], 

  };
  
const openapiSpecification = swaggerJsdoc(options);

const runSwagger = app => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(openapiSpecification)
      );
}

module.exports = runSwagger;

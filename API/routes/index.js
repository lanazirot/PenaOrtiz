const express = require("express");
const gimnasiosRouter = require("./gimnasios.route");
const estudiantesRouter = require("./estudiantes.route");

const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use('/estudiantes', estudiantesRouter);
  router.use('/gimnasios', gimnasiosRouter);
}
module.exports = routerApi;
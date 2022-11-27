const express = require("express");
const gimnasiosRouter = require("./gimnasios.route");
const estudiantesRouter = require("./estudiantes.route");
const apiRoutes = require("../config/apiRoutes");



const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use(apiRoutes.estudiantes, estudiantesRouter);
  router.use(apiRoutes.gimnasios, gimnasiosRouter);
  router.use((req, res, next) => {
    // Return error 404 JSON if route not found
    res.status(404).json({ message: 'Ruta no encontrada' });
  });
}
module.exports = routerApi;
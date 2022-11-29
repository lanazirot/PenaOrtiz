const express = require("express");
const gimnasiosRouter = require("./gimnasios.route");
const estudiantesRouter = require("./estudiantes.route");
const fotografiasRouter = require("./fotografias.route");
const apiRoutes = require("../config/apiRoutes");


/**
 * Ruteador de la API
 * @param {Express} app Aplicacion de express  
 */
const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use(apiRoutes.estudiantes, estudiantesRouter);
  router.use(apiRoutes.gimnasios, gimnasiosRouter);
  router.use(apiRoutes.fotografias, fotografiasRouter);
  router.use((req, res, next) => {
    // Return error 404 JSON if route not found
    res.status(404).json({ message: 'Ruta no encontrada' });
  });
}
module.exports = routerApi;
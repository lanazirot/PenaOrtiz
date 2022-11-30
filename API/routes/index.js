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
  app.use('*', (req, res) => {
    res.status(404).send({ message: 'Not found' });
  });
} 
module.exports = routerApi;
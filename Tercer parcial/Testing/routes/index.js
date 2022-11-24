const express = require("express");
const clientesRoute = require("./customersRoute.route");
const productosRouter = require("./productosRoute.route");

const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use('/clientes', clientesRoute);
  router.use('/productos', productosRouter);
}
module.exports = routerApi;
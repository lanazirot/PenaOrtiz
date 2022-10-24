const express = require("express");
const clientesRoute = require("./customersRoute.route");

const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use('/clientes', clientesRoute);
}
module.exports = routerApi;
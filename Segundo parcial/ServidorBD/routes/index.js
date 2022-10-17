const express = require("express");
const productsRouter = require("./customersRoute.route");

const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use('/customers', productsRouter);
}
module.exports = routerApi;
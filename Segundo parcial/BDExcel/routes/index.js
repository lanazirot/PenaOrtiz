const express = require("express");
const productsRouter = require("./customersRoute.route");
const json2xls = require("json2xls");

const routerApi = app => {
  const router = express.Router();
  app.use('/api', router);
  router.use(json2xls.middleware)
  router.use('/customers', productsRouter);
}
module.exports = routerApi;
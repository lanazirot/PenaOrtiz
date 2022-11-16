const validatePostProduct = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      res.status(400).json({
        message:
          "Some fields are required when adding a new product. Please check if your request is correct when using the POST request",
        data: req.body,
      });
    }else{
      req.newProduct = {
          nombre, precio
      }
      next()
    }
  };
  
  const validatePatchProduct = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      res.status(400).json({
        message:
          "Some fields are required when updating a new product. Please check if your request is correct when using the PATCH request",
        data: req.body,
      });
    }else{
      req.newProduct = {
          nombre, precio
      }
      next()
    }
  }
  
  module.exports = {validatePatchProduct, validatePostProduct}
  
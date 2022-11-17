const validatePostCustomer = (req, res, next) => {
  const { nombre, apellidos, direccion, numeroMembresia } = req.body;
  if (!nombre || !direccion || !numeroMembresia) {
    res.status(400).json({
      message:
        "Some fields are required when adding a new customer. Please check if your request is correct when using the POST request",
      data: req.body,
    });
  }else{
    req.newUser = {
        nombre, apellidos, direccion, numeroMembresia
    }
    next()
  }
};

const validatePatchCustomer = (req, res, next) => {
  const { nombre, apellidos, direccion } = req.body;
  if (!nombre || !direccion) {
    res.status(400).json({
      message:
        "Some fields are required when updating a new customer. Please check if your request is correct when using the PATCH request",
      data: req.body,
    });
  }else{
    req.newUser = {
        nombre, apellidos, direccion
    }
    next()
  }
}

module.exports = {validatePatchCustomer, validatePostCustomer}

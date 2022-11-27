const Joi = require('joi') 
const gimnasioSchema = Joi.object().keys({ 
    nombre: Joi.string().min(3).max(255).required(),
    direccion: Joi.string().min(3).max(255).required()
});
const updateGimnasioSchema = gimnasioSchema.fork(['nombre', 'direccion'], (schema) => schema.optional());
module.exports = {gimnasioSchema, updateGimnasioSchema};
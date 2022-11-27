const Joi = require('joi') 
/**
 * Esquema de validacion de un gimnasio
 */
const gimnasioSchema = Joi.object().keys({ 
    nombre: Joi.string().min(3).max(255).required(),
    direccion: Joi.string().min(3).max(255).required()
});
/**
 * Esquema de validacion para actualizar un gimnasio
 */
const updateGimnasioSchema = gimnasioSchema.fork(['nombre', 'direccion'], (schema) => schema.optional());
module.exports = {gimnasioSchema, updateGimnasioSchema};
const Joi = require('joi') 
/**
 * Esquema de validación para un estudiante
 */
const estudianteSchema = Joi.object().keys({ 
    nombre: Joi.string().min(3).max(255).required(),
    direccion: Joi.string().min(3).max(255).required(),
    peso: Joi.number().min(1).max(300).required(),
    cinta: Joi.string().valid('Blanca', 'Amarilla', 'Naranja', 'Verde', 'Azul', 'Roja', 'Negra').required(),
    id_gimnasio: Joi.number().required()
});

/**
 * Esquema de validación para actualizar un estudiante
 */
const updateEstudianteSchema = estudianteSchema.fork(['nombre', 'direccion', 'peso', 'cinta', 'id_gimnasio'], (schema) => schema.optional());

module.exports = {estudianteSchema, updateEstudianteSchema};
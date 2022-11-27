/**
 * 
 * @param {Schema} schema Esquema de validacion de Joi 
 * @param {*} property Propierdad a validar
 * @returns Al siguiente middleware si la validacion es exitosa, de lo contrario retorna un error
 */
const validatorSchema = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error == null) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(422).json({ error: message })
        }
    }
}

module.exports = validatorSchema;
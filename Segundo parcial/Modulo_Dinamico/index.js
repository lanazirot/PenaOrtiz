/**
 * @author Alan Peña Ortiz
 * @since 2022-10-10
 * @param {String} token Token
 * @returns True, if token equals 123456, otherwise, false
 */
const verificarToken = token => token === '123456';

/**
 * 
 * @param {String} texto Cualquier cadena 
 * @returns Cadena en mayuscula y sin espacios en blanco
 */
const mayusculas = texto => texto.toUpperCase().trim();


export {mayusculas, verificarToken};
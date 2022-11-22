/**
 *
 * Una clase que representa a una persona
 * @class
 */
class Persona {
  /**
   *
   * Crea una nueva persona
   * @param {string} nombre Nombre de la persona
   * @param {number} edad Edad de la persona
   * @param {string} sexo Sexo de la persona
   */
  constructor(nombre, edad, sexo) {
    this._nombre = nombre;
    this._edad = edad;
    this._sexo = sexo;
  }

  /**
   * @returns {string} Nombre de la persona
   */
  get nombre() {
    return this._nombre;
  }

  /**
   * @param {string} nombre Nombre de la persona
   */
  set nombre(nombre) {
    this._nombre = nombre;
  }

  /**
   *
   * @returns {string} Cadena con datos de la persona
   */
  toString() {
    return `Nombre: ${this._nombre}, Edad: ${this._edad}, Sexo: ${this._sexo}`;
  }
  /**
   * 
   * @returns {number} Cantidad de impuestos de la persona
   */
  calcularImpuestos() {
    return this._edad > 18 ? 500 : 0;
  }
}

module.exports = { Persona };

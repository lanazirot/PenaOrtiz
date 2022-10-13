/**
 * @author Alan Peña Ortiz
 * @since 2022-10-10
 * @param {String} token Token
 * @returns True, if token equals 123456, otherwise, false
 */
const verificarToken = token => token === '123456';

const hacerAlgoMuyImportante = variableSuperImportante => {
    const procesoSuperPesado = (req,res) => {
        const variable = 10;
        return variable;
    }
    return procesoSuperPesado(null,null);
}

module.exports = {hacerAlgoMuyImportante, verificarToken};
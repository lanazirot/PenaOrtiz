import { verificarToken } from "./index.js";


document.getElementById('presionar').addEventListener('click', (e) => {
    const texto = document.getElementById('texto').value
    const resultado = document.getElementById('resultado')
    if(verificarToken(texto)){
        resultado.innerHTML = 'Token verificado'
    }else{
        resultado.innerHTML = 'Token no verificado'
    }
})
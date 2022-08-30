//Import fetch
//Ejemplo solo en consola, una impresion sencilla.
const fetch = require('node-fetch');
// Use node.js para ejecutar el codigo
const url = 'http://dog-api.kinduff.com/api/facts';
(()=>{
    //La  manera con promise 
    fetch(url).then(res=> res.json()).then(({facts})=> {
        console.info(facts[0]);
    })
})();


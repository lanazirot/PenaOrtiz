//Import fetch
// Use node.js para ejecutar el codigo
const fetch = require('node-fetch');
const url = 'http://dog-api.kinduff.com/api/facts';


(async()=>{
    const res = await fetch(url);
    const data = await res.json();
    const { facts } = data;
    
    console.info(facts[0]);

})();
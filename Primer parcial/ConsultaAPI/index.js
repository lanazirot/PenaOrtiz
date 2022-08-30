//Import fetch
const fetch = require('node-fetch');
// Use node.js para ejecutar el codigo
const url = 'http://dog-api.kinduff.com/api/facts';

(async()=>{
    const res = await fetch(url);
    const { facts } = await res.json();
    console.info(facts[0]);
})();
//Import fetch
const fetch = require('node-fetch');
const url = 'http://dog-api.kinduff.com/api/facts';

// Use node.js para ejecutar el codigo
document.getElementById('obtener').addEventListener('click', fetching);
const fetching = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const { facts } = data;
    document.getElementById('leyenda').innerHTML = facts[0];
}
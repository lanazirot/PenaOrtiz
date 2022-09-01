const API = 'http://api.icndb.com/';
window.onload =  () => {
    const generarChiste = document.getElementById('generarChiste');

    generarChiste.addEventListener('click', async () =>{
        const firstName =  document.getElementById('firstName').value;
        const lastName =  document.getElementById('lastName').value;

        if(!firstName || !lastName){
            alert('Datos necesarios');
            return
        }


        const peticion = await fetch(`${API}/jokes/random?firstName=${firstName}&lastName=${lastName}`);
        const peticion_json = await peticion.json();
        const { type, value} = peticion_json;
        if(type === 'success'){
            document.getElementById('chiste-response').innerHTML = value.joke;
        }
    });
}


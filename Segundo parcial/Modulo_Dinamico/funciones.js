document.getElementById("presionar").addEventListener("click", async (e) => {
  /*
  
  // Forma 1.
  
  import("index.js").then((module) => {
    const {verificarToken} = module
    const texto = document.getElementById("texto").value;
    const resultado = document.getElementById("resultado");
    if (verificarToken(texto)) {
      resultado.innerHTML = "Token verificado";
    } else {
      resultado.innerHTML = "Token no verificado";
    }
  });
*/

  // Forma 2.

  const { verificarToken } = await import("./index.js");
  const texto = document.getElementById("texto").value;
  const resultado = document.getElementById("resultado");
  if (verificarToken(texto)) {
    resultado.innerHTML = "Token verificado";
  } else {
    resultado.innerHTML = "Token no verificado";
  }
});

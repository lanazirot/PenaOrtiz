new gridjs.Grid({
  columns: ["ID", "Nombre", "Apellidos", "Direccion", "No. membresia"],
  server: {
    url: "http://localhost:3000/api/clientes",
    then: ({data}) =>
      data.map((cliente) => [
        cliente.id,
        cliente.nombre,
        cliente.apellidos,
        cliente.direccion,
        cliente.numeroMembresia,
      ]),
  },
  search: true,
  language: {
    'search': {
      'placeholder': '🔍 Buscar...'
    },
    'pagination': {
      'previous': '⬅️',
      'next': '➡️',
      'showing': '😃 Mostrando',
      'results': () => 'Resultados'
    }
  },
  sort: true
}).render(document.getElementById("wrapper"));

const request = require("supertest");
const apiRoutes = require("../config/apiRoutes");Endpoints
const app = require("../index");

const apiTestGimnasio = `/api/${apiRoutes.gimnasios}`;

describe("Gimnasio Endpoints", () => {
  //Test /GET /api/gimnasios Debe devolver todos los gimnasios
  it("GET /api/gimnasios Debe devolver todos los gimnasios", async () => {
    const res = await request(app).get(`${apiTestGimnasio}`);
    expect(res.statusCode).toEqual(200);
  });

  //Test /GET /api/gimnasios/:id Debe devolver un gimnasio
  it("GET /api/gimnasios/:id Debe devolver un gimnasio", async () => {
    const res = await request(app).get(`${apiTestGimnasio}/1`);
    expect(res.statusCode).toEqual(200);
  });

  //Test /GET /api/gimnasios:id Debe devolver un error 404 si el gimnasio no existe
  it("GET /api/gimnasios/:id Debe devolver un error 404 si el gimnasio no existe", async () => {
    const res = await request(app).get(`${apiTestGimnasio}/100`);
    expect(res.statusCode).toEqual(404);
  });

  //Test /POST /api/gimnasios Debe crear un gimnasio
  it("POST /api/gimnasios Debe crear un gimnasio", async () => {
    const res = await request(app).post(`${apiTestGimnasio}`).send({
      nombre: "Gimnasio de prueba",
      direccion: "Calle de prueba",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre");
    expect(res.body).toHaveProperty("direccion");
  });

  //Test /POST /api/gimnasios Debe devolver un error 400 si el nombre no se envía
  it("POST /api/gimnasios Debe devolver un error 500 si el nombre no se envía", async () => {
    const res = await request(app).post(`${apiTestGimnasio}`).send({
      direccion: "Calle de prueba",
    });
    expect(res.statusCode).toEqual(500);
  });

  //Test /POST /api/gimnasios Debe devolver un error 400 si la dirección no se envía
  it("POST /api/gimnasios Debe devolver un error 500 si la dirección no se envía", async () => {
    const res = await request(app).post(`${apiTestGimnasio}`).send({
      nombre: "Gimnasio de prueba",
    });
    expect(res.statusCode).toEqual(500);
  });

  //Test /PUT /api/gimnasios/:id Debe actualizar un gimnasio
  it("PUT /api/gimnasios/:id Debe actualizar un gimnasio", async () => {
    //Obtener el ultimo gimnasio creado
    const ultimoGimnasio = await request(app).get(`${apiTestGimnasio}`);
    const id = ultimoGimnasio.body[ultimoGimnasio.body.length - 1].id_gimnasio;

    const res = await request(app).patch(`/api/gimnasios/${id}`).send({
      nombre: "Gimnasio de prueba actualizado",
      direccion: "Calle de prueba actualizado",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre).toEqual("Gimnasio de prueba actualizado");
    expect(res.body.direccion).toEqual("Calle de prueba actualizado");
  });

    //Test /DELETE /api/gimnasios/:id Debe eliminar un gimnasio
    it("DELETE /api/gimnasios/:id Debe eliminar un gimnasio", async () => {
      //Obtener el ultimo gimnasio creado
      const ultimoGimnasio = await request(app).get(`${apiTestGimnasio}`);
      const id = ultimoGimnasio.body[ultimoGimnasio.body.length - 1].id_gimnasio;
      console.log(id);
      const res = await request(app).delete(`${apiTestGimnasio}/${id}`);
      expect(res.statusCode).toEqual(200);
    });
  
    //Test /DELETE /api/gimnasios/:id Debe devolver un error 404 si el gimnasio no existe
    it("DELETE /api/gimnasios/:id Debe devolver un error 404 si el gimnasio no existe", async () => {
      const res = await request(app).delete(`${apiTestGimnasio}/10000`);
      expect(res.statusCode).toEqual(404);
    });
  
    //Test /DELETE /api/gimnasios/:id Debe devolver un error 400 si el id no es un número
    it("DELETE /api/gimnasios/:id Debe devolver un error 500 si el id no es un número", async () => {
      const res = await request(app).delete(`${apiTestGimnasio}/abc`);
      expect(res.statusCode).toEqual(500);
    });
});

const request = require("supertest");
const apiRoutes = require("../config/apiRoutes");
const app = require("../index");

const apiTestEstudiante = `/api/${apiRoutes.estudiantes}`;

describe("Estudiante Endpoints", () => {
  //Test /GET /api/estudiantes Debe devolver todos los estudiantes
  it("GET /api/estudiantes Debe devolver todos los estudiantes", async () => {
    const res = await request(app).get(apiTestEstudiante);
    expect(res.statusCode).toEqual(200);
  });

  //Test /GET /api/estudiantes/:id Debe devolver un estudiante
  it("GET /api/estudiantes/:id Debe devolver un estudiante", async () => {
    const res = await request(app).get(`${apiTestEstudiante}/1`);
    expect(res.statusCode).toEqual(200);
  });

  //Test /GET /api/estudiantes:id Debe devolver un error 404 si el estudiante no existe
  it("GET /api/estudiantes/:id Debe devolver un error 404 si el estudiante no existe", async () => {
    const res = await request(app).get(`${apiTestEstudiante}/10039`);
    expect(res.statusCode).toEqual(404);
  });

  //Test /POST /api/estudiantes Debe crear un estudiante
  it("POST /api/estudiantes Debe crear un estudiante", async () => {
    const res = await request(app).post(`${apiTestEstudiante}`).send({
      nombre: "Estudiante de prueba",
      direccion: "Calle de prueba",
      peso: 80.8,
      cinta: "Blanca",
      id_gimnasio: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre");
    expect(res.body).toHaveProperty("peso");
    expect(res.body).toHaveProperty("direccion");
    expect(res.body).toHaveProperty("cinta");
    expect(res.body).toHaveProperty("id_gimnasio");
  });

  //Test /PATCH /api/estudiantes/:id Debe actualizar un estudiante
  it("PATCH /api/estudiantes/:id Debe actualizar un estudiante", async () => {
    //Obtener el ultimo ID del estudiante creado en la prueba anterior
    const responseEstudiante = await request(app).get(apiTestEstudiante);
    const lastId = responseEstudiante.body[responseEstudiante.body.length - 1].id_estudiante;
    console.log(lastId);
    expect(lastId).not.toBeUndefined();
    const res = await request(app).patch(`${apiTestEstudiante}/${lastId}`).send({
      nombre: "Estudiante de prueba actualizada",
      direccion: "Calle de prueba actualizada",
      peso: 80.8,
      cinta: "Blanca",
      id_gimnasio: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre).toEqual("Estudiante de prueba actualizada");
    expect(res.body.direccion).toEqual("Calle de prueba actualizada");
  });

  //Test /DELETE /api/estudiantes/:id Debe eliminar un estudiante
  it("DELETE /api/estudiantes/:id Debe eliminar un estudiante", async () => {
    //Obtener el ultimo ID del estudiante creado en la prueba anterior
    const responseEstudiante = await request(app).get(apiTestEstudiante);
    const lastId = responseEstudiante.body[responseEstudiante.body.length - 1].id_estudiante;

    expect(lastId).not.toBeUndefined();
    const res = await request(app).delete(`${apiTestEstudiante}/${lastId}`);
    expect(res.statusCode).toEqual(200);
  });

  //Test /DELETE /api/estudiantes/:id Debe devolver un error 404 si el estudiante no existe
  it("DELETE /api/estudiantes/:id Debe devolver un error 404 si el estudiante no existe", async () => {
    const res = await request(app).delete(`${apiTestEstudiante}/10093`);
    expect(res.statusCode).toEqual(404);
  });




});

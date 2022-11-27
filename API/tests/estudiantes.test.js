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
    const res = await request(app).get(`${apiTestEstudiante}/100`);
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
    expect(res.body).toHaveProperty("estatura");
    expect(res.body).toHaveProperty("direccion");
    expect(res.body).toHaveProperty("cinta");
    expect(res.body).toHaveProperty("id_gimnasio");
  });

  //Test /PATCH /api/estudiantes/:id Debe actualizar un estudiante
  it("PATCH /api/estudiantes/:id Debe actualizar un estudiante", async () => {
    const res = await request(app).patch(`${apiTestEstudiante}/1`).send({
      nombre: "Estudiante de prueba",
      direccion: "Calle de prueba",
      peso: 80.8,
      cinta: "Blanca",
      id_gimnasio: 2,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("nombre");
    expect(res.body).toHaveProperty("direccion");
    expect(res.body).toHaveProperty("peso");
    expect(res.body).toHaveProperty("cinta");
    expect(res.body).toHaveProperty("id_gimnasio");

    //Comprobar que el gimnasio no tenga el estudiante en su lista de estudiantes
    const res2 = await request(app).get(`/api/gimnasios/1/estudiantes`);
    expect(res2.body.estudiantes).not.toContain(1);


  });
});

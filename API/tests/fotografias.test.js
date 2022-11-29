const request = require("supertest");
const apiRoutes = require("../config/apiRoutes");
const app = require("../index");

const apiTestFotografias = `/api/${apiRoutes.fotografias}`;

describe("Fotografias Endpoints", () => {
    //Test /GET /api/fotografias Debe devolver todas las fotografias
    it("GET /api/fotografias Debe devolver todas las fotografias", async () => {
        const res = await request(app).get(apiTestFotografias);
        expect(res.statusCode).toEqual(200);
    });

    //Test /GET /api/fotografias/:id Debe devolver una foto
    it("GET /api/fotografias/:id Debe devolver una foto", async () => {
        const res = await request(app).get(`${apiTestFotografias}/9`);
        expect(res.statusCode).toEqual(200);
    });

    //Test /GET /api/fotografias:id Debe devolver un error 404 si la foto no existe
    it("GET /api/fotografias/:id Debe devolver un error 404 si la foto no existe", async () => {
        const res = await request(app).get(`${apiTestFotografias}/10039`);
        expect(res.statusCode).toEqual(404);
    });

    //Test /POST /api/fotografias debe subir una fotografia a la base de datos
    it("POST /api/fotografias debe subir una fotografia a la base de datos", async () => {
        const res = await request(app).post(`${apiTestFotografias}`)
        .attach("image", "tests/FotoTest.jpg");
        expect(res.statusCode).toEqual(201);
    });

    //Test /DELETE /api/fotografias/:id debe borrar una fotografia de la base de datos
    it("DELETE /api/fotografias/:id debe borrar una fotografia de la base de datos", async () => {
        const res = await request(app).delete(`${apiTestFotografias}/10`);
        expect(res.statusCode).toEqual(200);
    });



});

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./../");
const { expect } = chai;

chai.use(chaiHttp);

describe("Routes", () => {
  describe("GET /", () => {
    it("Should return 404", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  // Test /clientes route
    describe("GET /clientes", () => {
        it("Should return 200", (done) => {
            chai
            .request(server)
            .get("/api/clientes")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        // It should return an array of objects
        it("Should return an array of objects", (done) => {
            chai
            .request(server)
            .get("/api/clientes")
            .end((err, res) => {
                console.log(res.body);
                expect(res.body.data).to.be.an("array");
                done();
            });
        });

        }
    );
});

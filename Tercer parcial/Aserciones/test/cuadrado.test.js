const potencia = require("../src/cuadrado");
const expect = require("chai").expect;
const assert = require("chai").assert;
require("chai").should();

//Test potencia function

describe("Test potencia function", () => {
  it("Expect return 4 when base is 2 and exponent is 2", () => {
    expect(potencia(2, 2)).to.equal(4);
  });
  it("Assert return 9 when base is 3 and exponent is 2", () => {
    assert.equal(potencia(3, 2), 9);
    assert.isFunction(potencia);
  });
  it("Should return 16 when base is 4 and exponent is 2", () => {
    const x = potencia(4, 2);
    x.should.equal(16);
    x.should.be.a("number");
    potencia.should.be.a("function");
  });
  it("Expect potencia be a function", () => {
    expect(potencia).to.be.a("function");
  });
  it("Expect potencia result to be a number", () => {
    expect(potencia(2, 2)).to.be.a("number");
  });
  it("Expect potencia 3 ,2 result not to equal 540", ()=> {
    expect(potencia(3, 2)).to.not.equal(540);
  });
});

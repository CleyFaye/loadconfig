import "chai/register-should.js";
import "../loader.js";

describe("Test framework can run", () => {
  it("true is true", () => {
    (true).should.equal(true);
  });
  it("should throw", () => {
    ((): void => {
      throw new Error("test");
    }).should.throw("test");
  });
});

import "chai/register-should";
import "../loader";

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

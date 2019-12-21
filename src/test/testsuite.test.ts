import "chai/register-should";
import "../loader";

describe("Test framework can run", function() {
  it("true is true", function() {
    (true).should.equal(true);
  });
  it("should throw", function() {
    ((): void => {
      throw new Error("test");
    }).should.throw("test");
  });
});

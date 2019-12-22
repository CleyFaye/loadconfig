import "chai/register-should";
import readFromJs from "../js";

const jsData = {
  stringOpt: "testJs",
  numberOpt: 42,
  arrayOpt: ["val6"],
};

const moveToTestDir = (testDir: string): void =>
  process.chdir(`testdata/${testDir}`);

describe("js", function() {
  describe("readFromJs())", function() {
    let initialCwd: string;
    before(function() {
      initialCwd = process.cwd();
    });
    beforeEach(function() {
      process.chdir(initialCwd);
    });
    after(function() {
      process.chdir(initialCwd);
    });
    it("Get expected values from js file", function() {
      moveToTestDir("havevalue");
      const readData = readFromJs("testPkg");
      readData.should.eql(jsData);
    });
    it("Get empty if file does not exist", function() {
      moveToTestDir("nofile");
      const readData = readFromJs("testPkg2");
      readData.should.eql({});
    });
  });
});

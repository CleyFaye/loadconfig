import "chai/register-should";
import readFromJson from "../json";

const jsonData = {
  stringOpt: "testJson",
  numberOpt: 63,
  arrayOpt: ["val3", "val4", "val5"],
  boolOpt: false,
};

const moveToTestDir = (testDir: string): void =>
  process.chdir(`testdata/${testDir}`);

describe("json", function() {
  describe("readFromJson()", function() {
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
    it("Get expected values from json file", async function() {
      moveToTestDir("havevalue");
      const readData = await readFromJson("testPkg");
      readData.should.eql(jsonData);
    });
    it("Get empty if file does not exist", async function() {
      moveToTestDir("nofile");
      const readData = await readFromJson("testPkg");
      readData.should.eql({});
    });
  });
});

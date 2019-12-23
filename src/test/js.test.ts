import "chai/register-should";
import readFromJs from "../js";
import {jsData, configName} from "./testdata";

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
      const readData = readFromJs(configName);
      readData.should.eql(jsData);
    });
    it("Get empty if file does not exist", function() {
      moveToTestDir("nofile");
      const readData = readFromJs(configName + "2");
      readData.should.eql({});
    });
  });
});

import "chai/register-should";
import readFromJson from "../json";
import {jsonData, configName} from "./testdata";

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
    it("Get expected values from json file", function() {
      moveToTestDir("havevalue");
      const readData = readFromJson(configName);
      readData.should.eql(jsonData);
    });
    it("Get empty if file does not exist", function() {
      moveToTestDir("nofile");
      const readData = readFromJson(configName);
      readData.should.eql({});
    });
  });
});

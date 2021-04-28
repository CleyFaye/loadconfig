import "chai/register-should";
import readFromJson from "../json";
import {jsonData, configName} from "./testdata";

const moveToTestDir = (testDir: string): void => process.chdir(`testdata/${testDir}`);

describe("json", () => {
  describe("readFromJson()", () => {
    let initialCwd: string;
    before(() => {
      initialCwd = process.cwd();
    });
    beforeEach(() => {
      process.chdir(initialCwd);
    });
    after(() => {
      process.chdir(initialCwd);
    });
    it("Get expected values from json file", () => {
      moveToTestDir("havevalue");
      const readData = readFromJson(configName);
      readData.should.eql(jsonData);
    });
    it("Get empty if file does not exist", () => {
      moveToTestDir("nofile");
      const readData = readFromJson(configName);
      readData.should.eql({});
    });
  });
});

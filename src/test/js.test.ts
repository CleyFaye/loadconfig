import "chai/register-should";
import readFromJs from "../js";
import {jsData, configName} from "./testdata";

const moveToTestDir = (testDir: string): void => process.chdir(`testdata/${testDir}`);

describe("js", () => {
  describe("readFromJs())", () => {
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
    it("Get expected values from js file", () => {
      moveToTestDir("havevalue");
      const readData = readFromJs(configName);
      readData.should.eql(jsData);
    });
    it("Get empty if file does not exist", () => {
      moveToTestDir("nofile");
      const readData = readFromJs(`${configName}2`);
      readData.should.eql({});
    });
  });
});

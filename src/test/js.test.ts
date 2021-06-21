import "chai/register-should.js";
import readFromJs from "../js.js";
import {jsData, configName} from "./testdata.js";

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
    it("Get expected values from js file", async () => {
      moveToTestDir("havevalue");
      const readData = await readFromJs(configName);
      readData.should.eql(jsData);
    });
    it("Get empty if file does not exist", async () => {
      moveToTestDir("nofile");
      const readData = await readFromJs(`${configName}2`);
      readData.should.eql({});
    });
  });
});

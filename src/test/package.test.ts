import "chai/register-should";
import readFromPackage from "../package";
import {packageData, configName} from "./testdata";

const moveToTestDir = (testDir: string): void => process.chdir(`testdata/${testDir}`);

describe("package", () => {
  describe("readFromPackage()", () => {
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
    it("Get expected values from package.json", () => {
      moveToTestDir("havevalue");
      const readData = readFromPackage(configName);
      readData.should.eql(packageData);
    });
    it("Get empty if section is missing", () => {
      moveToTestDir("nothavevalue");
      const readData = readFromPackage(configName);
      readData.should.eql({});
    });
    it("Get empty if file does not exist", () => {
      moveToTestDir("nofile");
      const readData = readFromPackage(configName);
      readData.should.eql({});
    });
  });
});

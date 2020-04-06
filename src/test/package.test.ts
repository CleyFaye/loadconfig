import "chai/register-should";
import readFromPackage from "../package";
import {packageData, configName} from "./testdata";

const moveToTestDir = (testDir: string): void =>
  process.chdir(`testdata/${testDir}`);

describe("package", function() {
  describe("readFromPackage()", function() {
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
    it("Get expected values from package.json", function() {
      moveToTestDir("havevalue");
      const readData = readFromPackage(configName);
      readData.should.eql(packageData);
    });
    it("Get empty if section is missing", function() {
      moveToTestDir("nothavevalue");
      const readData = readFromPackage(configName);
      readData.should.eql({});
    });
    it("Get empty if file does not exist", function() {
      moveToTestDir("nofile");
      const readData = readFromPackage(configName);
      readData.should.eql({});
    });
  });
});

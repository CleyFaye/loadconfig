import "chai/register-should";
import loadConfig, {readFromDefaultValues} from "../loader";
import {
  options,
  defaultData,
  configName,
  cliArgs,
  cliData,
  jsonData,
  packageData,
} from "./testdata";
import {replaceArgv} from "./util";

const jsData = {
  stringOpt: "testJs",
  numberOpt: 42,
  arrayOpt: ["val6"],
};

const moveToTestDir = (testDir: string): void =>
  process.chdir(`testdata/${testDir}`);

describe("loader", function() {
  describe("readFromDefaultValues()", function() {
    it("Default values returned correctly", function() {
      const readValues = readFromDefaultValues(options);
      readValues.should.eql(defaultData);
    });
  });
  describe("loadConfig())", function() {
    let initialCwd: string;
    let previousArgv: Array<string>;
    before(function() {
      initialCwd = process.cwd();
      previousArgv = process.argv;
    });
    beforeEach(function() {
      process.chdir(initialCwd);
    });
    after(function() {
      process.chdir(initialCwd);
      process.argv = previousArgv || ["", ""];
    });
    it("Get combined values (cli)", async function() {
      moveToTestDir("havevalue");
      replaceArgv(cliArgs);
      const readData = await loadConfig(options, configName);
      readData.should.eql(cliData);
    });
    it("Get combined values (js)", async function() {
      moveToTestDir("havevalue");
      replaceArgv(["--somethingElse"]);
      const readData = await loadConfig(options, configName);
      readData.should.eql({
        ...jsData,
        boolOpt: false,
      });
    });
    it("Get combined values (json)", async function() {
      moveToTestDir("havevaluejson");
      replaceArgv(["--somethingElse"]);
      const readData = await loadConfig(options, configName);
      readData.should.eql(jsonData);
    });
    it("Get combined values (package.json)", async function() {
      moveToTestDir("havevaluepackage");
      replaceArgv(["--somethingElse"]);
      const readData = await loadConfig(options, configName);
      readData.should.eql(packageData);
    });
    it("Get combined values (defaults)", async function() {
      moveToTestDir("nothavevalue");
      replaceArgv(["--somethingElse"]);
      const readData = await loadConfig(options, configName);
      readData.should.eql(defaultData);
    });
  });
});

import "chai/register-should";
import loadConfig, {readFromDefaultValues, clearCache, DataSource} from "../loader";
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
import {OptionType} from "../optiontype";

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
      clearCache();
    });
    after(function() {
      process.chdir(initialCwd);
      process.argv = previousArgv || ["", ""];
    });
    it("Get combined values (cli)", function() {
      moveToTestDir("havevalue");
      replaceArgv(cliArgs);
      const readData = loadConfig({options}, configName);
      readData.should.eql(cliData);
    });
    it("Get combined values (js)", function() {
      moveToTestDir("havevalue");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({options}, configName);
      readData.should.eql({
        ...jsData,
        boolOpt: false,
      });
    });
    it("Get combined values (skip json)", function() {
      moveToTestDir("havevaluejson");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({
        options,
        disableSource: new Set([DataSource.json]),
      }, configName);
      readData.should.eql(packageData);
    });
    it("Get combined values (json)", function() {
      moveToTestDir("havevaluejson");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({options}, configName);
      readData.should.eql(jsonData);
    });
    it("Get combined values (json no dot)", function() {
      moveToTestDir("havevaluejsonnodot");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig(
        {
          options,
          noDotFile: true,
        },
        configName,
      );
      readData.should.eql(jsonData);
    });
    it("Get combined values (package.json)", function() {
      moveToTestDir("havevaluepackage");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({options}, configName);
      readData.should.eql(packageData);
    });
    it("Get combined values (defaults)", function() {
      moveToTestDir("nothavevalue");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({options}, configName);
      readData.should.eql(defaultData);
    });
    it("Get combined values (no external files, cli)", function() {
      moveToTestDir("nothavevalue");
      replaceArgv(cliArgs);
      const readData = loadConfig({options});
      readData.should.eql(cliData);
    });
    it("Get combined values (no external files, defaults)", function() {
      moveToTestDir("nothavevalue");
      replaceArgv(["--somethingElse"]);
      const readData = loadConfig({options});
      readData.should.eql(defaultData);
    });
    it("Test cache", function() {
      moveToTestDir("nofile");
      replaceArgv(["--str", "argStr"]);
      const readData = loadConfig({
        options: {
          str: {
            type: OptionType.STRING,
          },
        },
      });
      readData.should.eql({str: "argStr"});
      // Command line should be exhausted by now
      const readData2 = loadConfig({
        options: {
          str: {
            type: OptionType.STRING,
          },
        },
      });
      readData2.should.eql({str: "argStr"});
    });
  });
});

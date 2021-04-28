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

const moveToTestDir = (testDir: string): void => process.chdir(`testdata/${testDir}`);

const testCLI = () => {
  it("Get combined values (cli)", () => {
    moveToTestDir("havevalue");
    replaceArgv(cliArgs);
    const readData = loadConfig({options, configName});
    readData.should.eql(cliData);
  });
};

const testJS = () => {
  it("Get combined values (js)", () => {
    moveToTestDir("havevalue");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({options, configName});
    readData.should.eql({
      ...jsData,
      boolOpt: false,
    });
  });
};

const testJSON = () => {
  it("Get combined values (skip json)", () => {
    moveToTestDir("havevaluejson");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({
      options,
      disableSource: new Set([DataSource.json]),
      configName,
    });
    readData.should.eql(packageData);
  });
  it("Get combined values (json)", () => {
    moveToTestDir("havevaluejson");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({options, configName});
    readData.should.eql(jsonData);
  });
  it("Get combined values (json no dot)", () => {
    moveToTestDir("havevaluejsonnodot");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({
      options,
      noDotFile: true,
      configName,
    });
    readData.should.eql(jsonData);
  });
};

const testPackage = () => {
  it("Get combined values (package.json)", () => {
    moveToTestDir("havevaluepackage");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({options, configName});
    readData.should.eql(packageData);
  });
};

const testDefault = () => {
  it("Get combined values (defaults)", () => {
    moveToTestDir("nothavevalue");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({options, configName});
    readData.should.eql(defaultData);
  });
};

const testNoValue = () => {
  it("Get combined values (no external files, cli)", () => {
    moveToTestDir("nothavevalue");
    replaceArgv(cliArgs);
    const readData = loadConfig({options});
    readData.should.eql(cliData);
  });
  it("Get combined values (no external files, defaults)", () => {
    moveToTestDir("nothavevalue");
    replaceArgv(["--somethingElse"]);
    const readData = loadConfig({options});
    readData.should.eql(defaultData);
  });
};

const testNoCache = () => {
  it("Test cache", () => {
    moveToTestDir("nofile");
    replaceArgv(["--str", "argStr"]);
    const readData = loadConfig({options: {str: {type: OptionType.STRING}}});
    readData.should.eql({str: "argStr"});
    // Command line should be exhausted by now
    const readData2 = loadConfig({options: {str: {type: OptionType.STRING}}});
    readData2.should.eql({str: "argStr"});
  });
};

const testLoadConfig = () => {
  const initialCwd: string = process.cwd();
  const previousArgv: Array<string> = process.argv;
  beforeEach(() => {
    process.chdir(initialCwd);
    clearCache();
  });
  after(() => {
    process.chdir(initialCwd);
    process.argv = previousArgv;
  });
  testCLI();
  testJS();
  testJSON();
  testPackage();
  testDefault();
  testNoValue();
  testNoCache();
};

const testReadDefault = () => {
  it("Default values returned correctly", () => {
    const readValues = readFromDefaultValues(options);
    readValues.should.eql(defaultData);
  });
};

describe("loader", () => {
  describe("readFromDefaultValues()", testReadDefault);
  describe("loadConfig())", testLoadConfig);
});

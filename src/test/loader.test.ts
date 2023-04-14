import "chai/register-should.js";
import loadConfig, {readFromDefaultValues, clearCache, DataSource} from "../loader.js";
import {OptionType} from "../optiontype.js";
import {
  options,
  defaultData,
  configName,
  cliArgs,
  cliData,
  jsonData,
  packageData,
} from "./testdata.js";
import {replaceArgv} from "./util.js";

const jsData = {
  stringOpt: "testJs",
  numberOpt: 42,
  arrayOpt: ["val6"],
};

const moveToTestDir = (testDir: string): void => process.chdir(`testdata/${testDir}`);

const testCLI = () => {
  it("Get combined values (cli)", async () => {
    moveToTestDir("havevalue");
    replaceArgv(cliArgs);
    const readData = await loadConfig({options, configName});
    readData.should.eql(cliData);
  });
};

const testJS = () => {
  it("Get combined values (js)", async () => {
    moveToTestDir("havevalue");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({options, configName});
    readData.should.eql({
      ...jsData,
      boolOpt: false,
    });
  });
};

const testJSON = () => {
  it("Get combined values (skip json)", async () => {
    moveToTestDir("havevaluejson");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({
      options,
      disableSource: new Set([DataSource.json]),
      configName,
    });
    readData.should.eql(packageData);
  });
  it("Get combined values (json)", async () => {
    moveToTestDir("havevaluejson");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({options, configName});
    readData.should.eql(jsonData);
  });
  it("Get combined values (json no dot)", async () => {
    moveToTestDir("havevaluejsonnodot");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({
      options,
      noDotFile: true,
      configName,
    });
    readData.should.eql(jsonData);
  });
};

const testPackage = () => {
  it("Get combined values (package.json)", async () => {
    moveToTestDir("havevaluepackage");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({options, configName});
    readData.should.eql(packageData);
  });
};

const testDefault = () => {
  it("Get combined values (defaults)", async () => {
    moveToTestDir("nothavevalue");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({options, configName});
    readData.should.eql(defaultData);
  });
};

const testNoValue = () => {
  it("Get combined values (no external files, cli)", async () => {
    moveToTestDir("nothavevalue");
    replaceArgv(cliArgs);
    const readData = await loadConfig({options});
    readData.should.eql(cliData);
  });
  it("Get combined values (no external files, defaults)", async () => {
    moveToTestDir("nothavevalue");
    replaceArgv(["--somethingElse"]);
    const readData = await loadConfig({options});
    readData.should.eql(defaultData);
  });
};

const testNoCache = () => {
  it("Test cache", async () => {
    moveToTestDir("nofile");
    replaceArgv(["--str", "argStr"]);
    const readData = await loadConfig({options: {str: {type: OptionType.STRING}}});
    readData.should.eql({str: "argStr"});
    // Command line should be exhausted by now
    const readData2 = await loadConfig({options: {str: {type: OptionType.STRING}}});
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

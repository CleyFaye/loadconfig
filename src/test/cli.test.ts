/* eslint-disable @typescript-eslint/no-magic-numbers */
import "chai/register-should";
import readFromCommandLine from "../cli";
import {OptionType} from "../optiontype";
import {ConfigType} from "../configtype";
import {cliData, options, cliArgs} from "./testdata";
import {replaceArgv} from "./util";

const cliArgsWithNoise = [
  "--number-opt",
  "1664",
  "--array-strings",
  "valCLI",
  "--no-bool-opt",
  "--somethingElse",
  "--array-strings",
  "valCLI2",
  "--string-opt",
  "testCLI",
];

// eslint-disable-next-line max-lines-per-function
const testFromCLI = () => {
  it("Parse all types of values", () => {
    replaceArgv(cliArgs);
    const readValues = readFromCommandLine(options);
    readValues.should.eql(cliData);
  });
  it("Leave other arguments intact", () => {
    replaceArgv(cliArgsWithNoise);
    const readValues = readFromCommandLine(options);
    readValues.should.eql(cliData);
    process.argv.length.should.equal(3);
    process.argv[2].should.equal("--somethingElse");
  });
  it("Check string-removing", () => {
    replaceArgv([
      "--str",
      "dummyValue",
      "--no-str",
    ]);
    const readValues = readFromCommandLine({str: {type: OptionType.STRING}});
    readValues.should.eql({str: undefined});
  });
  it("Check number-removing", () => {
    replaceArgv([
      "--numb",
      "37",
      "--no-numb",
    ]);
    const readValues = readFromCommandLine({numb: {type: OptionType.NUMBER}});
    readValues.should.eql({numb: undefined});
  });
  it("Number accepts only numbers", () => {
    replaceArgv([
      "--numb",
      "abc",
    ]);
    (
      (): ConfigType => readFromCommandLine({numb: {type: OptionType.NUMBER}})
    ).should.throw();
  });
  it("Check boolean set to true", () => {
    replaceArgv([
      "--bool-val",
    ]);
    const readValues = readFromCommandLine({boolVal: {type: OptionType.BOOLEAN}});
    readValues.should.eql({boolVal: true});
  });
  it("Check boolean set to false", () => {
    replaceArgv([
      "--no-bool-val",
    ]);
    const readValues = readFromCommandLine({boolVal: {type: OptionType.BOOLEAN}});
    readValues.should.eql({boolVal: false});
  });
  it("Check string arg without value", () => {
    replaceArgv([
      "--str",
    ]);
    (
      (): ConfigType => readFromCommandLine({str: {type: OptionType.STRING}})
    ).should.throw();
  });
  it("Check number arg without value", () => {
    replaceArgv([
      "--numb",
    ]);
    (
      (): ConfigType => readFromCommandLine({numb: {type: OptionType.NUMBER}})
    ).should.throw();
  });
  it("Check clearing array argument", () => {
    replaceArgv([
      "--str",
      "str1",
      "--str",
      "str2",
      "--no-str",
    ]);
    const readValues = readFromCommandLine({
      str: {
        type: OptionType.STRING,
        multiple: true,
      },
    });
    readValues.should.eql({str: []});
  });
  it("Make sure cli arguments are consummed", () => {
    replaceArgv([
      "--someArg",
      "nothing",
      "--str",
      "str1",
      "--someOtherArg",
    ]);
    const readValues = readFromCommandLine({str: {type: OptionType.STRING}});
    readValues.should.eql({str: "str1"});
    process.argv.slice(2).should.eql([
      "--someArg",
      "nothing",
      "--someOtherArg",
    ]);
  });
  it("Support for = type arguments", () => {
    replaceArgv([
      "--str",
      "str1",
      "--str=str2",
      "--str",
      "str3",
    ]);
    const readValues = readFromCommandLine({
      str: {
        type: OptionType.STRING,
        multiple: true,
        defaultValue: [],
      },
    });
    readValues.should.eql({str: ["str1", "str2", "str3"]});
  });
};

describe("cli", () => {
  const previousArgv: Array<string> = process.argv;
  after(() => {
    process.argv = previousArgv;
  });
  describe("readFromCommandLine()", testFromCLI);
});

import "chai/register-should";
import readFromCommandLine from "../cli";
import {OptionType, OptionDefinitions} from "../optiontype";
import {ConfigType} from "../configtype";

const cliData = {
  stringOpt: "testCLI",
  numberOpt: 1664,
  arrayOpt: ["valCLI", "valCLI2"],
  boolOpt: false,
};

const cliArgs = [
  "--number-opt",
  "1664",
  "--array-strings",
  "valCLI",
  "--no-bool-opt",
  "--array-strings",
  "valCLI2",
  "--string-opt",
  "testCLI"
];

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
  "testCLI"
];

const options: OptionDefinitions = {
  stringOpt: {
    type: OptionType.STRING,
    defaultValue: "defaultString",
  },
  numberOpt: {
    type: OptionType.NUMBER,
    defaultValue: 443,
  },
  arrayOpt: {
    cliName: "array-strings",
    type: OptionType.STRING,
    multiple: true,
  },
  boolOpt: {
    type: OptionType.BOOLEAN,
  },
};

/** Replace process.argv's arguments with the provided list */
const replaceArgv = (newParams: Array<string>): void => {
  process.argv = [
    process.argv[0],
    process.argv[1],
    ...newParams,
  ];
};

describe("cli", function() {
  let previousArgv: Array<string>;
  before(function() {
    previousArgv = process.argv;
  });
  after(function() {
    process.argv = previousArgv || ["", ""];
  });
  describe("readFromCommandLine()", function() {
    it("Parse all types of values", function() {
      replaceArgv(cliArgs);
      const readValues = readFromCommandLine(options);
      readValues.should.eql(cliData);
    });
    it("Leave other arguments intact", function() {
      replaceArgv(cliArgsWithNoise);
      const readValues = readFromCommandLine(options);
      readValues.should.eql(cliData);
      process.argv.length.should.equal(3);
      process.argv[2].should.equal("--somethingElse");
    });
    it("Check string-removing", function() {
      replaceArgv([
        "--str",
        "dummyValue",
        "--no-str",
      ]);
      const readValues = readFromCommandLine({
        str: {
          type: OptionType.STRING,
        },
      });
      readValues.should.eql({
        str: undefined,
      });
    });
    it("Check number-removing", function() {
      replaceArgv([
        "--numb",
        "37",
        "--no-numb",
      ]);
      const readValues = readFromCommandLine({
        numb: {
          type: OptionType.NUMBER,
        },
      });
      readValues.should.eql({
        numb: undefined,
      });
    });
    it("Number accepts only numbers", function() {
      replaceArgv([
        "--numb",
        "abc",
      ]);
      (
        (): ConfigType => readFromCommandLine({
          numb: {
            type: OptionType.NUMBER,
          },
        })
      ).should.throw();
    });
    it("Check boolean set to true", function() {
      replaceArgv([
        "--bool-val",
      ]);
      const readValues = readFromCommandLine({
        boolVal: {
          type: OptionType.BOOLEAN,
        },
      });
      readValues.should.eql({
        boolVal: true,
      });
    });
    it("Check boolean set to false", function() {
      replaceArgv([
        "--no-bool-val",
      ]);
      const readValues = readFromCommandLine({
        boolVal: {
          type: OptionType.BOOLEAN,
        },
      });
      readValues.should.eql({
        boolVal: false,
      });
    });
    it("Check string arg without value", function() {
      replaceArgv([
        "--str",
      ]);
      (
        (): ConfigType => readFromCommandLine({
          str: {
            type: OptionType.STRING,
          },
        })
      ).should.throw();
    });
    it("Check number arg without value", function() {
      replaceArgv([
        "--numb",
      ]);
      (
        (): ConfigType => readFromCommandLine({
          numb: {
            type: OptionType.NUMBER,
          },
        })
      ).should.throw();
    });
    it("Check clearing array argument", function() {
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
      readValues.should.eql({
        str: [],
      });
    });
  });
});

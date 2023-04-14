import {OptionDefinitions, OptionType} from "../optiontype.js";

export const options: OptionDefinitions = {
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
  boolOpt: {type: OptionType.BOOLEAN},
  objOpt: {type: OptionType.OBJECT},
  arrayObj: {type: OptionType.OBJECT, multiple: true},
};

export const configName = "testPkg";

export const defaultData = {
  stringOpt: "defaultString",
  numberOpt: 443,
  arrayOpt: undefined,
  boolOpt: undefined,
  arrayObj: undefined,
  objOpt: undefined,
};

export const cliArgs = [
  "--number-opt",
  "1664",
  "--array-strings",
  "valCLI",
  "--no-bool-opt",
  "--array-strings",
  "valCLI2",
  "--string-opt",
  "testCLI",
];

export const cliData = {
  stringOpt: "testCLI",
  numberOpt: 1664,
  arrayOpt: ["valCLI", "valCLI2"],
  boolOpt: false,
};

export const jsData = {
  stringOpt: "testJs",
  numberOpt: 42,
  arrayOpt: ["val6"],
  objOpt: {rule: 34},
  arrayObj: [{rule: 34}, {rule: 63}],
};

export const jsonData = {
  stringOpt: "testJson",
  numberOpt: 63,
  arrayOpt: ["val3", "val4", "val5"],
  boolOpt: false,
  objOpt: {rule: 1664},
  arrayObj: [{rule: 34}, {rule: 1492}]
};

export const packageData = {
  stringOpt: "test",
  numberOpt: 34,
  arrayOpt: ["val1", "val2"],
  boolOpt: true,
  objOpt: {rule: 34},
  arrayObj: [{rule: 34}, {rule: 63}],
};

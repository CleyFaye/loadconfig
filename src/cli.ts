import {OptionDefinitions, OptionType, OptionDefinition, typeHaveExtra} from "./optiontype";
import {ConfigType, BaseValueType} from "./configtype";
import {camelToKebab} from "./util";

/** Check if the given cli argument is in the options list */
const checkAgainstOptions = (
  cliArg: string,
  options: OptionDefinitions
): (
  {
    optionName: string;
    remove: boolean;
  }
  | undefined
) => {
  for (const optionName in options) {
    const cliName = options[optionName].cliName || camelToKebab(optionName);
    if (cliArg === `--${cliName}`) {
      return {
        optionName,
        remove: false,
      };
    }
    if (cliArg === `--no-${cliName}`) {
      return {
        optionName,
        remove: true,
      };
    }
  }
};

/** Convert a CLI read value to a BaseValueType */
const handleValue = (
  option: OptionDefinition,
  extra: string | undefined,
  remove: boolean
): (BaseValueType | undefined) => {
  switch (option.type) {
  case OptionType.STRING:
    if (remove) {
      return;
    }
    if (extra) {
      return extra;
    }
    throw new Error("Missing value for string argument");
  case OptionType.NUMBER:
    if (remove) {
      return;
    }
    if (extra) {
      const asNumber = parseFloat(extra);
      if (asNumber.toString() === extra) {
        return asNumber;
      }
    }
    throw new Error("Missing value for number argument");
  case OptionType.BOOLEAN:
    if (remove) {
      return false;
    }
    return true;
  }
};

/** Try to read a value from the command line.
 * 
 * If a value is found, it is removed from argv
 */
const getNextValue = (
  options: OptionDefinitions
): (
  {
    optionName: string;
    value: BaseValueType | undefined;
  }
  | undefined
) => {
  for (let i = 2; i < process.argv.length; ++i) {
    const optionDef = checkAgainstOptions(process.argv[i], options);
    if (!optionDef) {
      continue;
    }
    const option = options[optionDef.optionName];
    let extra;
    if (typeHaveExtra(option.type) && !optionDef.remove) {
      extra = process.argv[i + 1];
      process.argv.splice(i, 2);
    } else {
      process.argv.splice(i, 1);
    }
    return {
      optionName: optionDef.optionName,
      value: handleValue(option, extra, optionDef.remove),
    };
  }
};

/** Read options from CLI
 * 
 * This will remove parsed options from process.argv
 */
export default <T extends ConfigType>(
  options: OptionDefinitions
): T => {
  const result: ConfigType = {};
  let nextValue;
  while ((nextValue = getNextValue(options)) !== undefined) {
    const {optionName, value} = nextValue;
    if (options[optionName].multiple) {
      if (value === undefined) {
        result[optionName] = [];
      } else {
        const previousValue = result[optionName];
        if (previousValue === undefined) {
          result[optionName] = [value];
        } else {
          (previousValue as Array<BaseValueType>).push(value);
        }
      }
    } else {
      result[optionName] = value;
    }
  }
  return result as T;
};

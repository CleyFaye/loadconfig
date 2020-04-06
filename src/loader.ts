import readFromPackage from "./package";
import readFromJson from "./json";
import readFromJS from "./js";
import readFromCommandLine from "./cli";
import {OptionDefinitions} from "./optiontype";
import {ConfigType} from "./configtype";

export const readFromDefaultValues = <T extends ConfigType>(
  options: OptionDefinitions
): T => {
  const result: ConfigType = {};
  for (const optionName in options) {
    result[optionName] = options[optionName].defaultValue;
  }
  return result as T;
};

let cachedResult: ConfigType | undefined;

export const clearCache = (): void => {
  cachedResult = undefined;
};

export default <T extends ConfigType>(
  options: OptionDefinitions,
  configName?: string
): T => {
  if (cachedResult) {
    return cachedResult as T;
  }
  cachedResult = {
    ...readFromDefaultValues<T>(options),
    ...readFromPackage<T>(configName),
    ...readFromJson<T>(configName),
    ...readFromJS<T>(configName),
    ...readFromCommandLine<T>(options),
  };
  return cachedResult as T;
};

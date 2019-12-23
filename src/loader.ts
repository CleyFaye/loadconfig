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
): Promise<T> => {
  if (!cachedResult) {
    return Promise.all([
      readFromPackage<T>(configName),
      readFromJson<T>(configName),
    ]).then(([fromPackage, fromJson]) => cachedResult = {
      ...readFromDefaultValues<T>(options),
      ...fromPackage,
      ...fromJson,
      ...readFromJS<T>(configName),
      ...readFromCommandLine<T>(options),
    });
  } else {
    return Promise.resolve(cachedResult as T);
  }
};

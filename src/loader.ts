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

export default async <T extends ConfigType>(
  options: OptionDefinitions,
  configName?: string
): Promise<T> => ({
  ...readFromDefaultValues<T>(options),
  ...await readFromPackage<T>(configName),
  ...await readFromJson<T>(configName),
  ...readFromJS<T>(configName),
  ...readFromCommandLine<T>(options),
});

import readFromPackage from "./package";
import readFromJson from "./json";
import readFromJS from "./js";
import readFromCommandLine from "./cli";
import {OptionDefinitions} from "./optiontype";
import {ConfigType} from "./configtype";

export enum DataSource {
  package = "PACKAGE",
  json = "JSON",
  js = "JS",
  commandLine = "CLI",
}

export interface Settings {
  /**
   * Define acceptable configuration options
   */
  options: OptionDefinitions;
  /**
   * Base name for the configuration files/properties
   */
  configName?: string;
  /**
   * Disable some input source
   */
  disableSource?: Set<DataSource>;
  /**
   * Do not prefix file names with a dot
   */
  noDotFile?: boolean;
}

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
  {
    options,
    disableSource,
    noDotFile,
    configName,
  }: Settings,
): T => {
  if (cachedResult) {
    return cachedResult as T;
  }
  const disabledSource = disableSource || new Set([]);
  const packageData = disabledSource.has(DataSource.package)
    ? undefined
    : readFromPackage<T>(configName);
  const jsonData = disabledSource.has(DataSource.json)
    ? undefined
    : readFromJson<T>(configName, noDotFile);
  const jsData = disabledSource.has(DataSource.js)
    ? undefined
    : readFromJS<T>(configName, noDotFile);
  const cliData = disabledSource.has(DataSource.commandLine)
    ? undefined
    : readFromCommandLine<T>(options);
  cachedResult = {
    ...readFromDefaultValues<T>(options),
    ...packageData,
    ...jsonData,
    ...jsData,
    ...cliData,
  };
  return cachedResult as T;
};

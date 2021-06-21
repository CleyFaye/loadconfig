import readFromPackage from "./package.js";
import readFromJson from "./json.js";
import readFromJS from "./js.js";
import readFromCommandLine from "./cli.js";
import {OptionDefinitions} from "./optiontype.js";
import {ConfigType} from "./configtype.js";

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
  options: OptionDefinitions,
): T => {
  const result: ConfigType = {};
  for (const optionName of Object.keys(options)) {
    result[optionName] = options[optionName].defaultValue;
  }
  return result as T;
};

let cachedResult: ConfigType | undefined;

export const clearCache = (): void => {
  cachedResult = undefined;
};

export default async <T extends ConfigType>(
  {
    options,
    disableSource,
    noDotFile,
    configName,
  }: Settings,
): Promise<T> => {
  if (cachedResult) {
    return cachedResult as T;
  }
  const disabledSource = disableSource ?? new Set([]);
  const packageData = disabledSource.has(DataSource.package)
    ? undefined
    : readFromPackage<T>(configName);
  const jsonData = disabledSource.has(DataSource.json)
    ? undefined
    : readFromJson<T>(configName, noDotFile);
  const jsData = disabledSource.has(DataSource.js)
    ? undefined
    : await readFromJS<T>(configName, noDotFile);
  const cliData = disabledSource.has(DataSource.commandLine)
    ? undefined
    : readFromCommandLine<T>(options);
  // eslint-disable-next-line require-atomic-updates
  cachedResult = {
    ...readFromDefaultValues<T>(options),
    ...packageData,
    ...jsonData,
    ...jsData,
    ...cliData,
  };
  return cachedResult as T;
};

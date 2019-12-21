import {
  readJSON,
  existsSync,
} from "fs-extra";
import {camelToKebab} from "./util";

const PACKAGE = "package.json";

export type ConfigPropertyType = string
  | number
  | boolean
  | Array<string>;

export type ConfigType = Record<string, ConfigPropertyType>;

enum CLIArgumentType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  STRINGS = "Array<string>",
}

interface CLIArgument {
  name: string;
  cliName: string;
  typeName: CLIArgumentType;
}

type CLIArguments = Array<CLIArgument>;

/** Convert default values to a list of parameters */
const getParametersList = <T extends ConfigType>(
  defaultValues: T
): CLIArguments => Object.keys(defaultValues).map(name => {
    const defaultValue = defaultValues[name];
    let typeName;
    if (Array.isArray(defaultValue)) {
      typeName = CLIArgumentType.STRINGS;
    } else if (typeof defaultValue === "string") {
      typeName = CLIArgumentType.STRING;
    } else if (typeof defaultValue === "boolean") {
      typeName = CLIArgumentType.BOOLEAN;
    } else {
      typeName = CLIArgumentType.NUMBER;
    }
    return {
      name,
      cliName: camelToKebab(name),
      typeName,
    };
  });

export const getFromPackage = async <T extends ConfigType>(
  configName: string
): Promise<T> => {
  if (existsSync(PACKAGE)) {
    const packageContent = await readJSON(PACKAGE);
    return packageContent[configName] || {};
  }
  return ({} as T);
};

export const getFromJSON = async <T extends ConfigType>(
  configName: string
): Promise<T> => {
  const jsonPath = `.${configName}.json`;
  if (existsSync(jsonPath)) {
    return await readJSON(jsonPath);
  }
  return ({} as T);
};

export const getFromJS = async <T extends ConfigType>(
  configName: string
): Promise<T> => {
  const jsPath = `./.${configName}.js`;
  if (existsSync(jsPath)) {
    return await require(jsPath);
  }
  return ({} as T);
};

export const getFromCommandLine = <T extends ConfigType>(
  defaultValues: T
): T => {
  const result: ConfigType = {};
  const paramsList = getParametersList(defaultValues);
  for (let i = 2; i < process.argv.length; ++i) {
    const arg = process.argv[i];
    paramsList.forEach(paramDef => {
      switch (paramDef.typeName) {
      case CLIArgumentType.STRING:
        if (arg === `--${paramDef.cliName}`) {
          result[paramDef.name] = process.argv[i + 1];
          process.argv.splice(i, 2);
          i -= 1;
        }
        break;
      case CLIArgumentType.NUMBER:
        if (arg === `--${paramDef.cliName}`) {
          result[paramDef.name] = parseFloat(process.argv[i + 1]);
          process.argv.splice(i, 2);
          i -= 1;
        }
        break;
      case CLIArgumentType.BOOLEAN:
        if (arg === `--${paramDef.cliName}`) {
          result[paramDef.name] = true;
          process.argv.splice(i, 1);
          i -= 1;
        } else if (arg === `--no-${paramDef.cliName}`) {
          result[paramDef.name] = false;
          process.argv.splice(i, 1);
          i -= 1;
        }
        break;
      case CLIArgumentType.STRINGS:
        if (arg === `--${paramDef.cliName}`) {
          if (!result[paramDef.name]) {
            result[paramDef.name] = [];
          }
          (result[paramDef.name] as Array<string>).push(process.argv[i + 1]);
          process.argv.splice(i, 2);
          i -= 1;
        }
        break;
      }
    });
  }
  return (result as T);
};

export default async <T extends ConfigType>(
  defaultValues: T,
  configName: string
): Promise<T> => ({
  ...defaultValues,
  ...await getFromPackage(configName),
  ...await getFromJSON(configName),
  ...await getFromJS(configName),
  ...getFromCommandLine(defaultValues),
});

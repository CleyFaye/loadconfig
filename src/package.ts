import {readJSON, existsSync} from "fs-extra";
import {ConfigType} from "./configtype";

const PACKAGE = "package.json";

export default async <T extends ConfigType> (
  configName?: string
): Promise<T> => {
  if (configName) {
    if (existsSync(PACKAGE)) {
      const packageContent = await readJSON(PACKAGE);
      return packageContent[configName] || {};
    }
  }
  return ({} as T);
};

import {readJSONSync, existsSync} from "fs-extra";
import {ConfigType} from "./configtype";

const PACKAGE = "package.json";

export default <T extends ConfigType> (
  configName?: string
): T => {
  if (configName) {
    if (existsSync(PACKAGE)) {
      const packageContent = readJSONSync(PACKAGE);
      return packageContent[configName] || {};
    }
  }
  return ({} as T);
};

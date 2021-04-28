import {readFileSync, existsSync} from "fs";
import {ConfigType} from "./configtype";

const PACKAGE = "package.json";

export default <T extends ConfigType> (
  configName?: string
): T => {
  if (configName) {
    if (existsSync(PACKAGE)) {
      const packageContentStr = readFileSync(PACKAGE, "utf8");
      const packageContent = JSON.parse(packageContentStr);
      return packageContent[configName] || {};
    }
  }
  return ({} as T);
};

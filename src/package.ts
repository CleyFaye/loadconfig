import {readFileSync, existsSync} from "fs";
import {ConfigType} from "./configtype";

const PACKAGE = "package.json";

export default <T extends ConfigType> (
  configName?: string,
): T => {
  if (configName) {
    if (existsSync(PACKAGE)) {
      const packageContentStr = readFileSync(PACKAGE, "utf8");
      const packageContent = JSON.parse(packageContentStr) as Record<string, unknown>;
      if (configName in packageContent) {
        return packageContent[configName] as T;
      }
    }
  }
  return {} as unknown as T;
};

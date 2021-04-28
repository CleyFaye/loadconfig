import {resolve} from "path";
import {existsSync} from "fs";
import {ConfigType} from "./configtype";

export default <T extends ConfigType>(
  configName?: string
): T => {
  if (configName) {
    configName = configName.replace(/\\|\//g, "");
    const jsPath = resolve(".", `.${configName.toLowerCase()}.js`);
    if (existsSync(jsPath)) {
      return require(jsPath);
    }
  }
  return ({} as T);
};

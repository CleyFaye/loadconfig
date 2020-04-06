import {readJSONSync, existsSync} from "fs-extra";
import {ConfigType} from "./configtype";

export default <T extends ConfigType> (
  configName?: string
): T => {
  if (configName) {
    const jsonPath = `.${configName.toLowerCase()}.json`;
    if (existsSync(jsonPath)) {
      return readJSONSync(jsonPath);
    }
  }
  return ({} as T);
};

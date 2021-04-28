import {readFileSync, existsSync} from "fs";
import {ConfigType} from "./configtype";

export default <T extends ConfigType> (
  configName?: string
): T => {
  if (configName) {
    const jsonPath = `.${configName.toLowerCase()}.json`;
    if (existsSync(jsonPath)) {
      const fileData = readFileSync(jsonPath, "utf8");
      return JSON.parse(fileData);
    }
  }
  return ({} as T);
};

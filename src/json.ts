import {readFileSync, existsSync} from "fs";
import {ConfigType} from "./configtype.js";
import {configFileName} from "./util.js";

const readFromJSON = <T extends ConfigType> (
  configName?: string,
  noDotFile = false,
): T => {
  if (configName) {
    const jsonPath = configFileName(configName, "json", !noDotFile);
    if (existsSync(jsonPath)) {
      const fileData = readFileSync(jsonPath, "utf8");
      return JSON.parse(fileData) as T;
    }
  }
  return {} as unknown as T;
};

export default readFromJSON;

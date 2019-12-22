import {readJSON, existsSync} from "fs-extra";
import {ConfigType} from "./configtype";

export default async <T extends ConfigType> (
  configName?: string
): Promise<T> => {
  if (configName) {
    const jsonPath = `.${configName}.json`;
    if (existsSync(jsonPath)) {
      return await readJSON(jsonPath);
    }
  }
  return ({} as T);
};

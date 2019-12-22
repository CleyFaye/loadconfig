import {existsSync} from "fs-extra";
import {ConfigType} from "./configtype";

export default async <T extends ConfigType>(
  configName?: string
): Promise<T> => {
  if (configName) {
    const jsPath = `./.${configName.toLowerCase()}.js`;
    if (existsSync(jsPath)) {
      return await require(jsPath);
    }
  }
  return ({} as T);
};

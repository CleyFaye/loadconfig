import {resolve} from "path";
import {existsSync} from "fs";
import {ConfigType} from "./configtype";
import {configFileName} from "./util";

export default <T extends ConfigType>(
  configName?: string,
  noDotFile = false,
): T => {
  if (configName) {
    const jsPath = resolve(configFileName(configName, "js", !noDotFile));
    if (existsSync(jsPath)) {
      // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      return require(jsPath) as T;
    }
  }
  return {} as unknown as T;
};

import {resolve} from "path";
import {existsSync} from "fs";
import {ConfigType} from "./configtype.js";
import {configFileName} from "./util.js";

export default async <T extends ConfigType>(
  configName?: string,
  noDotFile = false,
): Promise<T> => {
  if (configName) {
    const jsPath = resolve(configFileName(configName, "js", !noDotFile));
    if (existsSync(jsPath)) {
      // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      const mod = await import(jsPath) as Record<string, unknown>;
      if (mod.default !== undefined) return mod.default as T;
      return mod as T;
    }
  }
  return {} as unknown as T;
};

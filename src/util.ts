/** Convert a string identifier from camel case to kebab case.
 *
 * This is not perfect, but will allow for the first character to not be
 * uppercase.
 * There's also moderate support for all caps word in the middle, as long as
 * there is no two consecutive all caps words, which are undistinguishable.
 */
export const camelToKebab = (camel: string): string => camel.length === 0
  ? ""
  : `${camel[0].toUpperCase()}${camel.substring(1)}`
    .replace(
      /[A-Z][A-Z0-9]+[a-z0-9]/gu,
      v => v[0]
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      + v.substring(1, v.length - 3).toLowerCase()
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      + v.substring(v.length - 2),
    ).replace(
      /[A-Z][A-Z]+$/u,
      v => v[0] + v.substring(1).toLowerCase(),
    )
    .split(/(?=[A-Z])/u)
    .map(word => word.toLowerCase())
    .join("-");

const sanitizeFilename = (filename: string): string => filename
  .replace(/\\|\//gu, "-")
  .toLowerCase();

/**
 * Return a configuration filename
 */
export const configFileName = (
  baseName: string,
  suffix: string,
  dotPrefix: boolean,
): string => `${dotPrefix ? "." : ""}${sanitizeFilename(baseName)}.${suffix}`;

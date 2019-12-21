/** Convert a string identifier from camel case to kebab case.
 * 
 * This is not perfect, but will allow for the first character to not be
 * uppercase.
 * There's also moderate support for all caps word in the middle, as long as
 * there is no two consecutive all caps words, which are undistinguishable.
 */
export const camelToKebab = (camel: string): string =>
// Remove full cap words followed by regular words
  camel.length == 0
    ? ""
    : `${camel[0].toUpperCase()}${camel.substr(1)}`
      .replace(
        /[A-Z][A-Z0-9]+[a-z0-9]/g,
        v => v[0]
        + v.substr(1, v.length - 3).toLowerCase()
        + v.substr(v.length - 2)
      ).replace(
        /[A-Z][A-Z]+$/,
        v => v[0] + v.substr(1).toLowerCase()
      ).split(/(?=[A-Z])/).map(word => word.toLowerCase()).join("-");

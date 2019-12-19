# @cley_faye/loadconfig

Load configuration by looking into multiple places, updating values with each
lookup:

- default values
- from a specific section in package.json
- from a json file
- from a js file
- from command line flags

Configuration is very basic, and mostly handle strings, numbers, bool and array
of strings.

## Usage

Where you need your configuration, call the function exported by the library.

```JavaScript
import loadConfig from "@cley_faye/loadconfig";

loadConfig(
  defaultValues,
  configName
).then(config => {});
```

## Settings

When passing default values, all expected values from command line should be
provided.
Each value can be either a string, a number, a boolean, or an array of string.
For array values, it means that the command line will accept multiple
occurrence of the same argument.

The `configName` argument is the name to use when looking for configuration in
`package.json` and in external files.
It is used to find a property by that name in `package.json`, and for files
names `.<configName>.js` and `.<configName>.json`.

## From command line

Every property from the default values can be provided on the command line.
Properties names will be converted from camel case to kebab case, and looked
for in the command line arguments.
If an argument match, it is removed from the list of arguments. If the same
argument is matched multiple time, only the latest one is kept, except for
properties that are arrays, in which case each value is concatenated to the
array.
If the default value is a number, values are converted to floats.
For boolean, if the argument is present, the value is set to true.
If the default value is true and you want to set it to false, it is possible to
use `--no-<arg name>`.
Arrays only support strings.

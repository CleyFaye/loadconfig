# @cley_faye/loadconfig

Load configuration by looking into multiple places, updating values with each
lookup:

- default values
- from a specific section in package.json
- from a json file
- from a js file
- from command line flags

Configuration is very basic, and mostly handle strings, numbers, bool and array
of those.
Array values defined in later configuration source overrides completely values
from previous sources. This mean that an array value set in a json file
would be completely erased by a value set in a js file or on command line.

## Usage

Where you need your configuration, call the function exported by the library.

```JavaScript
import loadConfig from "@cley_faye/loadconfig";

loadConfig(
  {
    options,
    configName,
  },
).then(config => {});
```

The result is cached by default; that is because CLI arguments are removed from
argv, so subsequent calls could return a different value than the first call.

## Settings

### Configuring options

Each value can be either a string, a number, a boolean, or an array of these.
For array values, it means that the command line will accept multiple
occurrence of the same argument.
The `options` argument is an object where keys are configuration options names
and values are objects that have the following properties:

- cliName: optional name for reading from the command line
  (default to kebab case of the option name)
- multiple: set to true to change the option type to be an array of values
- type: expected value type. Only used for reading from CLI. Can be `string`,
  `number` or `boolean`.
- defaultValue: an optional default value

### Naming the config source

The `configName` argument is the name to use when looking for configuration in
`package.json` and in external files.
It is used to find a property by that name in `package.json`, and for files
names `.<configName>.js` and `.<configName>.json`.

It is possible to disable prefixing the config files by a dot (`.`) by adding the `noDotFile`
property, set to true.
It is also possible to skip some data source by setting the `disableSource` property.

## From command line

Options can be read from command line.
If an argument match, it is removed from the list of arguments. If the same
argument is matched multiple time, only the latest one is kept, except for
properties that are arrays, in which case each value is concatenated to the
array.
It is possible to remove a value using `--no-<arg name>`, except for booleans
where it would set them to false.

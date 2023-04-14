/* eslint-disable @typescript-eslint/naming-convention */
/** Possible option types */
export enum OptionType {
  /** Option is kept as a string. */
  STRING = "string",
  /** Option is converted to number.
   *
   * If the value can't be converted to a number, an error is raised
   */
  NUMBER = "number",
  /** Option is a boolean.
   *
   * Option takes no extra parameter; the presence of the option means true.
   * Using "--no-<option name>" set the value to false.
   */
  BOOLEAN = "boolean",
  /** Option is any JS object.
   * 
   * This can not be set from the CLI, only from JavaScript/JSON/package.json
   */
  OBJECT = "object",
}
/* eslint-enable @typescript-eslint/naming-convention */

/** Definition for a single option */
export interface OptionDefinitionBase {
  /** Option name for use on command line. Default to name in kebab case */
  cliName?: string;
  /** Option support multiple occurrence */
  multiple?: boolean;
  /** Option type */
  type: OptionType;
}

export interface OptionDefinitionString extends OptionDefinitionBase {
  type: OptionType.STRING;
  multiple?: false;
  defaultValue?: string;
}

export interface OptionDefinitionNumber extends OptionDefinitionBase {
  type: OptionType.NUMBER;
  multiple?: false;
  defaultValue?: number;
}

export interface OptionDefinitionBoolean extends OptionDefinitionBase {
  type: OptionType.BOOLEAN;
  multiple?: false;
  defaultValue?: boolean;
}

export interface OptionDefinitionObject {
  type: OptionType.OBJECT;
  multiple?: false;
  defaultValue?: object;
}

export interface OptionDefinitionStrings extends OptionDefinitionBase {
  type: OptionType.STRING;
  multiple: true;
  defaultValue?: Array<string>;
}

export interface OptionDefinitionNumbers extends OptionDefinitionBase {
  type: OptionType.NUMBER;
  multiple: true;
  defaultValue?: Array<number>;
}

export interface OptionDefinitionBooleans extends OptionDefinitionBase {
  type: OptionType.BOOLEAN;
  multiple: true;
  defaultValue?: Array<boolean>;
}

export interface OptionDefinitionObjects {
  type: OptionType.OBJECT;
  multiple: true;
  defaultValue?: Array<object>;
}

export type OptionDefinition =
  OptionDefinitionString
  | OptionDefinitionNumber
  | OptionDefinitionBoolean
  | OptionDefinitionStrings
  | OptionDefinitionObject
  | OptionDefinitionNumbers
  | OptionDefinitionBooleans
  | OptionDefinitionObjects;

/** List of options definitions */
export type OptionDefinitions = Record<string, OptionDefinition>;

export const typeHaveExtra = (optionType: OptionType): boolean => ({
  [OptionType.STRING]: true,
  [OptionType.NUMBER]: true,
  [OptionType.BOOLEAN]: false,
  [OptionType.OBJECT]: false,
}[optionType]);

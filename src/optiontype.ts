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
}

/** Definition for a single option */
export interface OptionDefinitionBase {
  /** Option name for use on command line. Default to name in kebab case */
  cliName?: string;
  /** Option description for CLI help */
  description?: string;
  /** Option support multiple occurrence */
  multiple?: boolean;
  /** Option type */
  type: OptionType;
}

export interface OptionDefinitionString extends OptionDefinitionBase {
  type: OptionType.STRING;
  defaultValue?: string;
}

export interface OptionDefinitionNumber extends OptionDefinitionBase {
  type: OptionType.NUMBER;
  defaultValue?: number;
}

export interface OptionDefinitionBoolean extends OptionDefinitionBase {
  type: OptionType.BOOLEAN;
  defaultValue?: boolean;
}

export type OptionDefinition =
  OptionDefinitionString
  | OptionDefinitionNumber
  | OptionDefinitionBoolean;

/** List of options definitions */
export type OptionDefinitions = Record<string, OptionDefinition>;

export const typeHaveExtra = (optionType: OptionType): boolean => {
  switch (optionType) {
  case OptionType.STRING: return true;
  case OptionType.NUMBER: return true;
  case OptionType.BOOLEAN: return false;
  default:
    throw new Error("Unexpected data type");
  }
};

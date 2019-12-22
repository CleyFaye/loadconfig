export type BaseValueType =
  string
  | number
  | boolean;

export type ValueType =
  BaseValueType
  | Array<BaseValueType>;

export type ConfigType = Record<string, ValueType | undefined>;

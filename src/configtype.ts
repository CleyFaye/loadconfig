export type BaseValueType =
  string
  | number
  | boolean
  | object;

export type ValueType =
  BaseValueType
  | Array<BaseValueType>;

export type ConfigType = Record<string, ValueType | undefined>;

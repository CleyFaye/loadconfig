export default <ConfigType>(defaultValues: ConfigType): Promise<ConfigType> =>
  Promise.resolve(defaultValues);

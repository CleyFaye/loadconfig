/** Replace process.argv's arguments with the provided list */
export const replaceArgv = (newParams: Array<string>): void => {
  process.argv = [
    process.argv[0],
    process.argv[1],
    ...newParams,
  ];
};

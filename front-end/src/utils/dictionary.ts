/* eslint-disable @typescript-eslint/no-explicit-any */
export function createDictionary<T extends Record<string, any>, K extends keyof T>(values: T[], key: K): Record<string, T | undefined> {
  const pluginDictionary: { [key: string]: T } = {};

  values.forEach((value) => {
    pluginDictionary[value[key]] = value;
  });

  return pluginDictionary;
}

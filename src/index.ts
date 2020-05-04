import { NativeModules } from "react-native";

type RawMap = Record<string, string>;

type ParsedMap = Record<string, string | boolean>;

type LaunchArgumentsType = {
  value<T extends object = ParsedMap>(): T;
};

const raw = NativeModules.LaunchArguments.value as RawMap;
const parsed: ParsedMap = {};
for (const k in raw) {
  const rawValue = raw[k];
  try {
    parsed[k] = JSON.parse(rawValue);
  } catch {
    parsed[k] = rawValue;
  }
}

export const LaunchArguments: LaunchArgumentsType = {
  value<T>(): T {
    return (parsed as any) as T;
  },
};

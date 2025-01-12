import { NativeModules, Platform } from "react-native";

const LINKING_ERROR =
  `The package 'react-native-launch-arguments' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const LaunchArgumentsModule = NativeModules.LaunchArguments
  ? NativeModules.LaunchArguments
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type RawMap = Record<string, string>;

type ParsedMap = Record<string, string | boolean>;

type LaunchArgumentsType = {
  value<T extends object = ParsedMap>(): T;
};

let parsed: ParsedMap | null = null;

export const LaunchArguments: LaunchArgumentsType = {
  value<T>(): T {
    if (parsed) {
      return parsed as any as T;
    }

    parsed = {};

    const raw = LaunchArgumentsModule.value as RawMap;

    for (const k in raw) {
      const rawValue = raw[k];
      try {
        parsed[k] = JSON.parse(rawValue);
      } catch {
        parsed[k] = rawValue;
      }
    }

    return parsed as any as T;
  },
};

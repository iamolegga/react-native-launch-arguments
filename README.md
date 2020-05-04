# react-native-launch-arguments

React Native module to get launch arguments.

Mostly it's made for using [`launchArgs parameter of device.launchApp method`](https://github.com/wix/Detox/blob/master/docs/APIRef.DeviceObjectAPI.md#7-additional-launch-arguments) of [Detox](https://github.com/wix/Detox/)

**iOS**: it takes data from `[[NSProcessInfo processInfo] arguments]`

**Android**: it takes data from `currentActivity.getIntent().getBundleExtra("launchArgs")`

## Getting started

```sh
npm i react-native-launch-arguments
cd ios && pod install && cd ..
```

## Usage

In JS:

```js
import { LaunchArguments } from "react-native-launch-arguments";
LaunchArguments.value();
```

In TS:

```ts
import { LaunchArguments } from "react-native-launch-arguments";
interface MyExpectedArgs {
  authToken?: string;
  skipAuth?: boolean;
}
LaunchArguments.value<MyExpectedArgs>();
```

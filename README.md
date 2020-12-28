# react-native-launch-arguments

Make passing parameters from testing tool to react native super easy. 

Mostly it's made for using 
* [`launchArgs parameter of device.launchApp method`](https://github.com/wix/Detox/blob/master/docs/APIRef.DeviceObjectAPI.md#7-additional-launch-arguments) of [Detox](https://github.com/wix/Detox/)
* [`optionalIntentArguments (Android)` and `processArguments (iOS)`](http://appium.io/docs/en/writing-running-appium/caps/) parameters with [Appium](http://appium.io/)

**iOS**: it takes data from `[[NSProcessInfo processInfo] arguments]`

**Android**: it takes data from [`currentActivity.getIntent().getBundleExtra("launchArgs")`](https://developer.android.com/reference/android/content/Intent#getBundleExtra(java.lang.String)) together with [`currentActivity.getIntent().getStringExtra("launchArgs")`](https://developer.android.com/reference/android/content/Intent#getStringExtra(java.lang.String))
* see [`ADB docs`](https://developer.android.com/studio/command-line/adb#IntentSpec) for details

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

# react-native-launch-arguments

React Native module to get launch arguments. Make passing parameters from testing tool to react native super easy.

Mostly it's made for using:
* [`launchArgs parameter of device.launchApp method`](https://wix.github.io/Detox/docs/api/device/#7-launchargsadditional-process-launch-arguments) of [Detox](https://github.com/wix/Detox/) (see the [launch arguments guide](https://wix.github.io/Detox/docs/guide/launch-args) for full details)
* [`optionalIntentArguments (Android)` and `processArguments (iOS)`](http://appium.io/docs/en/writing-running-appium/caps/) parameters with [Appium](http://appium.io/)
   ```tsx
   capabilities: {
     optionalIntentArguments: `--ez myBool true --es myStr 'string text'`, // Android
     processArguments: {args : ['-myBool', 'true','-myStr', 'string text']}, // iOS
   }
   ```
* [`arguments parameter of launchApp command`](https://maestro.mobile.dev/api-reference/commands/launchapp#launch-arguments) of [Maestro](https://maestro.mobile.dev/)
  ```yaml
  - launchApp:
      appId: "com.example.app"
      arguments: 
         foo: "This is a string"
         isFooEnabled: false
         fooValue: 3.24
         fooInt: 3
  ```

**iOS**: it takes data from `[[NSProcessInfo processInfo] arguments]`

**Android**: it takes data from `currentActivity.getIntent().getBundleExtra("launchArgs")` for detox and `intent.getExtras()` for ADB params


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

## Caveats

Due to React Native [issue #37518](https://github.com/facebook/react-native/issues/37518), on Android, the module force-waits for the Android activity to reach the [RESUMED state](https://developer.android.com/guide/components/activities/activity-lifecycle#alc), before moving foward with native-modules initialization completion. While commonly the wait is scarce (the activity is already in the resumed state at this point), until the RN issue is fixed, the module may introduce delays in app loading time in some edge cases.

## Verifying install

To launch the app with arguments, verifying your install, you can:

### iPhone simulator

You can use `xcrun` to boot your app on the simulator.

The following command-line will load your app on the booted iOS simulator. Just
replace `com.MyAppBundleId` with your Bundle Identifier, and the `params` with
your params.

```bash
xcrun simctl launch booted com.MyAppBundleId -noParams -param "hello"
```

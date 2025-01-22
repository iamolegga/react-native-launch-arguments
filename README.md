# react-native-launch-arguments

React Native module to get launch arguments.

Makes passing parameters from testing libraries and debugs tools to
react-native super easy.

## Install

```sh
npm i react-native-launch-arguments
cd ios && pod install && cd ..
```

## Usage

### In you code
#### Javascript

```js
import { LaunchArguments } from "react-native-launch-arguments";
LaunchArguments.value();
```

#### Typescript

```ts
import { LaunchArguments } from "react-native-launch-arguments";
interface MyExpectedArgs {
  authToken?: string;
  skipAuth?: boolean;
}
LaunchArguments.value<MyExpectedArgs>();
```

### Integrating with End-to-end testing tools and debuggers

The intended use is with end-to-end tools like Detox.

#### **[Detox](https://github.com/wix/Detox/)**

* See [`device.launchApp({launchArgs:{...}})`](https://wix.github.io/Detox/docs/api/device/#7-launchargsadditional-process-launch-arguments)
* See [launch arguments guide](https://wix.github.io/Detox/docs/guide/launch-args) for full details.

#### **[Appium](http://appium.io/)**

* [`optionalIntentArguments (Android)` and `processArguments (iOS)`](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
   ```tsx
   capabilities: {
     optionalIntentArguments: `--ez myBool true --es myStr 'string text'`, // Android
     processArguments: {args : ['-myBool', 'true','-myStr', 'string text']}, // iOS
   }
   ```

#### **[Maestro](https://maestro.mobile.dev/)**
* [`arguments parameter of launchApp command`](https://maestro.mobile.dev/api-reference/commands/launchapp#launch-arguments)
  ```yaml
  - launchApp:
      appId: "com.example.app"
      arguments:
         foo: "This is a string"
         isFooEnabled: false
         fooValue: 3.24
         fooInt: 3
  ```

#### **XCode**
* [`XCode Launch Args`](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables)
* In XCode add launch arguments on the "Arguments" tab in the "Run" section of the Scheme editor:
    * Product -> Scheme -> Edit Scheme... -> Run -> Arguments tab -> Arguments Passed On Launch
    * Set each arg witha preceding `-`.
    * For example if you want to set arg `hello` to `"world"` to receive a LaunchArgs instance of`{ "hello":"world" }`, you would enter the following into the entry space for the arg:
  ```
  -hello "world"
  ```

## Platform-specific Notes

### iOS

It takes data from `[[NSProcessInfo processInfo] arguments]`

#### Verifying install on  iPhone simulator

You can use `xcrun` to boot your app on the simulator.

The following command-line will load your app on the booted iOS simulator. Just
replace `com.MyAppBundleId` with your Bundle Identifier, and the `params` with
your params.

```bash
xcrun simctl launch booted com.MyAppBundleId -noParams -param "hello"
```

### Android

It takes data from `currentActivity.getIntent().getBundleExtra("launchArgs")` for detox and `intent.getExtras()` for ADB params

#### Caveats on Android

##### React-Native

Due to React Native [issue #37518](https://github.com/facebook/react-native/issues/37518), on Android, the module force-waits for the Android activity to reach the [RESUMED state](https://developer.android.com/guide/components/activities/activity-lifecycle#alc), before moving foward with native-modules initialization completion. While commonly the wait is scarce (the activity is already in the resumed state at this point), until the RN issue is fixed, the module may introduce delays in app loading time in some edge cases.

##### Expo

There is [know `expo` bug](https://github.com/expo/expo/issues/31830) with empty passed arguments.

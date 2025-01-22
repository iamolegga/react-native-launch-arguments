package com.reactnativelauncharguments;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class LaunchArgumentsModule extends ReactContextBaseJavaModule {

    private static final long ACTIVITY_WAIT_INTERVAL = 100L;
    private static final int ACTIVITY_WAIT_TRIES = 200;

    private static final String DETOX_LAUNCH_ARGS_KEY = "launchArgs";

    LaunchArgumentsModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "LaunchArguments";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        // When the app is killed, it doesn't start the activity so no need to wait for it
        if (!isAppKilled()) {
            // This is work-around for the RN problem described here:
            // https://github.com/facebook/react-native/issues/37518
            waitForActivity();
        }

        return new HashMap<String, Object>() {{
            // In iOS hashmap returns inside another one, because constants
            // not visible. So, for consistency here do the same.
            put("value", parseIntentExtras());
        }};
    }

    /**
     * Looks like a bug in RN, without it this module is invisible
     * in NativeModules.
     */
    @ReactMethod
    public void foo() {}

    private void waitForActivity() {
        for (int tries = 0; tries < ACTIVITY_WAIT_TRIES && !isActivityReady(); tries++) {
            sleep(ACTIVITY_WAIT_INTERVAL);
        }
    }

    private Map<String, Object> parseIntentExtras() {
        final Map<String, Object> map = new HashMap<>();

        final Activity activity = getCurrentActivity();
        if (activity == null) {
            return map;
        }

        final Intent intent = activity.getIntent();
        if (intent == null) {
            return map;
        }

        parseDetoxExtras(map, intent);
        parseADBArgsExtras(map, intent);
        return map;
    }

    private void parseDetoxExtras(Map<String, Object> map, Intent intent) {
        final Bundle bundle = intent.getBundleExtra(DETOX_LAUNCH_ARGS_KEY);
        if (bundle != null) {
            for (String key : bundle.keySet()) {
                map.put(key, bundle.getString(key));
            }
        }
    }

    private void parseADBArgsExtras(Map<String, Object> map, Intent intent) {
        final Bundle bundleExtras = intent.getExtras();
        if (bundleExtras != null) {
            for (String key : bundleExtras.keySet()) {
                if (!DETOX_LAUNCH_ARGS_KEY.equals(key) && !"android.nfc.extra.NDEF_MESSAGES".equals(key)) {
                    if ((bundleExtras.get(key) instanceof Integer
                            || bundleExtras.get(key) instanceof Double
                            || bundleExtras.get(key) instanceof Boolean
                            || bundleExtras.get(key) instanceof String)) {
                        map.put(key, bundleExtras.get(key));
                    } else {
                        map.put(key, bundleExtras.getString(key));
                    }
                }
            }
        }
    }

    private boolean isActivityReady() {
        return getReactApplicationContext().hasCurrentActivity();
    }

    private static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private boolean isAppKilled() {
        ActivityManager activityManager = (ActivityManager) getReactApplicationContext().getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();

        if (appProcesses == null) {
            return true; // No processes, app is likely killed
        }

        final String packageName = getReactApplicationContext().getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.processName.equals(packageName)) {
                // App process is found, app is not killed
                return false;
            }
        }

        // App process not found, app is killed
        return false;
    }
}

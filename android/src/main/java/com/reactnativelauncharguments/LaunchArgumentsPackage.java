package com.reactnativelauncharguments;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class LaunchArgumentsPackage extends TurboReactPackage {

    @Nullable
    @Override
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
        if (name.equals(LaunchArgumentsModule.NAME)) {
            return new LaunchArgumentsModule(reactContext);
        } else {
            return null;
        }
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
            moduleInfos.put(
                    LaunchArgumentsModule.NAME,
                    new ReactModuleInfo(
                            LaunchArgumentsModule.NAME,
                            LaunchArgumentsModule.NAME,
                            false, // canOverrideExistingModule
                            false, // needsEagerInit
                            true, // hasConstants
                            false, // isCxxModule
                            true // isTurboModule
                    ));
            return moduleInfos;
        };
    }
}

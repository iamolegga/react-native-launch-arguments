#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <ReactCommon/RCTTurboModule.h>
#import <RNLaunchArgumentsSpec/RNLaunchArgumentsSpec.h>

@interface LaunchArguments : NSObject <NativeLaunchArgumentsSpec>
#else
@interface LaunchArguments : NSObject <RCTBridgeModule>
#endif

@end

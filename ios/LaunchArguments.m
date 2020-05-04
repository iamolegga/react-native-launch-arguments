#import "LaunchArguments.h"

@implementation LaunchArguments

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
	return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

- (NSDictionary *)constantsToExport
{
	return @{@"value": [self argsToDictionary]};
}

- (NSDictionary*)argsToDictionary{
	NSArray *processArgs = [[NSProcessInfo processInfo] arguments];

	NSMutableArray *arguments = [[NSMutableArray alloc]initWithArray: processArgs];

	// remove entrypoint
	[arguments removeObjectAtIndex:0];

	NSMutableDictionary *argsdict = [NSMutableDictionary dictionary];

	NSString *truthy = @"true";

	for (int i=0; i<arguments.count; i+=1) {
		NSString *current = arguments[i];

		if ([self isFlag:current]) {
			// --some-flag...

			if ([self isPair:current]){
				// --some-flag=some-value
				NSArray *pair = [current componentsSeparatedByString:@"="];
				NSString *key = [self cleanValue: pair[0]];
				NSString *value = pair[1];
				argsdict[key]=value;
				continue;
			}

			NSString *key = [self cleanValue:current];

			if (i+1<arguments.count) {
				// has next argument
				NSString *next = arguments[i+1];

				if ([self isKey:next]) {
					// --some-flag
					argsdict[key] = truthy;
				} else {
					// --some-flag some-value
					argsdict[key] = next;
					i++;
				}
			} else {
				// last argument
				argsdict[key] = truthy;
			}
		}

		// -key value
		else if ([self isKey:current] && i+1<arguments.count) {
			argsdict[[self cleanValue:current]] = arguments[i+1];
			i++;
		}
	}

	return [NSDictionary dictionaryWithDictionary:argsdict];
}

- (BOOL)isFlag:(NSString *)arg
{
	return [[arg substringToIndex:2] isEqual: @"--"];
}

- (BOOL)isPair:(NSString *)arg
{
	return [arg rangeOfString:@"="].location != NSNotFound;
}

- (BOOL)isKey:(NSString *)arg
{
	return [[arg substringToIndex:1] isEqual: @"-"];
}

- (NSString *)cleanValue:(NSString *)arg
{
	return [arg stringByReplacingOccurrencesOfString:@"-" withString:@""];
}

@end

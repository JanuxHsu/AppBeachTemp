NSBundle *b = [NSBundle bundleWithPath:@"/System/Library/PrivateFrameworks/FTServices.framework"];
BOOL success = [b load];

Class FTDeviceSupport = NSClassFromString(@"FTDeviceSupport");
id si = [FTDeviceSupport valueForKey:@"sharedInstance"];

NSLog(@"-- %@", [si valueForKey:@"deviceColor"]);
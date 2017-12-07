
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#if __has_include(<React/RCTDevMenu.h>)
#import <React/RCTDevMenu.h>
#endif

@interface RNDevToolsSpy : NSObject <RCTBridgeModule>

#if __has_include("RCTDevMenu.h")
@property (nonatomic, strong, readonly) RCTDevMenuItem *devMenuItem;
#endif

@end
  

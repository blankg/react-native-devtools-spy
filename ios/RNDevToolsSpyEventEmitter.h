//
//  RNDevToolsSpyEventEmitter.h
//  RNDevToolsSpy
//
//  Created by guy blank on 12/5/17.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#endif


@interface RNDevToolsSpyEventEmitter : RCTEventEmitter <RCTBridgeModule>

@end

//
//  RNDevToolsSpyEventEmitter.m
//  RNDevToolsSpy
//
//  Created by guy blank on 12/5/17.
//
#import "RNDevToolsSpyEventEmitter.h"
#import <Foundation/Foundation.h>

@implementation RNDevToolsSpyEventEmitter

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
    // UIApplication.applicationState seems reasonably safe to access from
    // a background thread.
    return NO;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"toggleSpy"];
}

- (void)receiveToggleNotification
{
    [self sendEventWithName:@"toggleSpy" body:nil];
}

- (void)startObserving
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveToggleNotification)
                                                 name:@"toggleSpy"
                                               object:nil];
}
- (void)stopObserving
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
@end

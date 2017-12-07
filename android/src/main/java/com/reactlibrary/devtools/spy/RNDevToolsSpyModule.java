
package com.reactlibrary.devtools.spy;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNDevToolsSpyModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNDevToolsSpyModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNDevToolsSpy";
  }
}
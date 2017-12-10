package com.reactlibrary.devtools.spy;

import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.devsupport.interfaces.DevOptionHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by guyblank on 10/13/17.
 */

public class SpyOptionsHandler implements DevOptionHandler {

    private ReactInstanceManager _instanceManager;

    public SpyOptionsHandler(ReactInstanceManager instanceManager) {
        this._instanceManager = instanceManager;
    }

    @Override
    public void onOptionSelected() {
        Log.d("SpyOptionsHandler", "Spy Clicked");
        this._instanceManager
                .getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule
                        .RCTDeviceEventEmitter.class)
                .emit("toggleSpy", null);
    }
}

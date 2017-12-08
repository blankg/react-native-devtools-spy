
# react-native-devtools-spy

Add this package to your react native project to get an extra "Spy" development menu option.
Clicking the "Spy" button will turn on extra logs:
1. All MessageQueue messages (messages going over the javascript <-> native bridge).[Currently implemented for iOS]
2. All MobX events. [Not implemented yet]

## Getting started

`$ npm install react-native-devtools-spy --save`

### Mostly automatic installation

`$ react-native link react-native-devtools-spy`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-devtools-spy` and add `RNDevToolsSpy.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNDevToolsSpy.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.devtools.spy.RNDevToolsSpyPackage;` to the imports at the top of the file
  - Add `new RNDevToolsSpyPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-dev-tools-spy'
  	project(':react-native-dev-tools-spy').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-dev-tools-spy/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-dev-tools-spy')
  	```


## Usage
Add the DevToolsSpy component to your view hierarchy:
```javascript
import DevToolsSpy from 'react-native-devtools-spy';
...
render() {
    return (
      <View>
          {__DEV__ ? <DevToolsSpy /> : null}
      </View>
    );
  }
```
  

/**
 * Created by guyblank on 1/5/18.
 */
var fs = require("fs");
var glob = require("glob");
var path = require("path");

console.log("Running android postlink script");

var ignoreFolders = { ignore: ["node_modules/**", "**/build/**"] };

var mainActivityPath = glob.sync("**/MainActivity.java", ignoreFolders)[0];

// 1. Add the getOnCreateOverride override
var getOnCreateOverride = `
        @Override
        protected void onCreate(Bundle savedInstanceState) {
		  super.onCreate(savedInstanceState);
		  if (BuildConfig.DEBUG) {
			  getReactInstanceManager().getDevSupportManager()
					  .addCustomDevOption("Spy",
							  new SpyOptionsHandler(
									  getReactInstanceManager()));
		  }
	  }
    `;

var getImports = `import com.reactlibrary.devtools.spy.SpyOptionsHandler;
import android.os.Bundle;`;

function isAlreadyOverridden(codeContents) {
	return /@Override\s*\n\s*protected void onCreate\(\)\s*\{[\s\S]*?\}/.test(codeContents);
}

if (mainActivityPath) {
	var mainActivityContents = fs.readFileSync(mainActivityPath, "utf8");
	if (isAlreadyOverridden(mainActivityContents)) {
		console.log(`"onCreate" is already overridden`);
	} else {
		var reactActivityImport = "import com.facebook.react.ReactActivity;";
		mainActivityContents = mainActivityContents.replace(reactActivityImport,
			`${reactActivityImport}\n${getImports}`);
		var mainActivityClassDeclaration = "public class MainActivity extends ReactActivity {";
		mainActivityContents = mainActivityContents.replace(mainActivityClassDeclaration,
			`${mainActivityClassDeclaration}\n${getOnCreateOverride}`);
		fs.writeFileSync(mainActivityPath, mainActivityContents);
	}
} else {
	console.log("Couldn't find Android application entry point");
	throw new Error(`Couldn't find Android application entry point. You might need to update it manually. \
    Please refer to plugin configuration section for Android at \
    https://github.com/blankg/react-native-devtools-spy#manual-installation-mandatory-for-android for more details`);
}
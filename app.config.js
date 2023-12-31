export default{
  "expo": {
    "name": "firs-tproject",
    "slug": "firs-tproject",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins":[
      "@react-native-google-signin/google-signin"
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier":"com.hm.firebasesignin",
      "googleServicesFile":process.env.GOOGLE_SERVICES_PLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package":"com.hm.firebasesignin",
      "googleServicesFile":process.env.GOOGLE_SERVICES_JSON


    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "d9919c8f-fe5b-4511-9201-2e4ca9438d25"
      }
    }
  }
}

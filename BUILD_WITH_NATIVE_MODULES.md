
# Building HUSH with Native Modules

## Overview
The HUSH app now includes native Android code to access installed apps. This requires a **custom development build** and will NOT work in Expo Go.

## Quick Start

### Option 1: Local Development Build (Recommended for Testing)
```bash
# 1. Install dependencies
npm install

# 2. Prebuild native code
npx expo prebuild --platform android --clean

# 3. Run on Android device/emulator
npx expo run:android
```

### Option 2: EAS Build (Recommended for Distribution)
```bash
# 1. Install EAS CLI (if not already installed)
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Configure EAS (if not already done)
eas build:configure

# 4. Create development build
eas build --platform android --profile development

# 5. Or create production build
eas build --platform android --profile production
```

## What Changed?

### New Files Added:
1. **`modules/installed-apps/`** - Native module for accessing installed apps
   - `index.ts` - TypeScript API
   - `android/src/main/java/com/installedapps/` - Kotlin native code

2. **`app.plugin.js`** - Expo config plugin to add Android permissions

3. **Updated `app.json`** - Added:
   - `QUERY_ALL_PACKAGES` permission
   - Config plugin reference

### Modified Files:
1. **`app/(tabs)/(home)/index.tsx`** - Now loads real installed apps on Android
2. **`app/(tabs)/(home)/index.ios.tsx`** - iOS version (uses mock data)
3. **`app/app-detail.tsx`** - Opens system notification settings

## Platform Differences

### Android (Fully Functional)
- ✅ Lists all installed user apps
- ✅ Shows real app icons
- ✅ Opens system notification settings
- ⚠️ Cannot directly modify notification settings (Android security)

### iOS (Limited)
- ❌ Cannot access installed apps (iOS privacy restrictions)
- ℹ️ Uses mock data for demonstration
- ℹ️ Directs users to iOS Settings app

## Troubleshooting

### "Module not found" error
- Make sure you ran `npx expo prebuild`
- Clean and rebuild: `npx expo prebuild --clean`

### No apps showing on Android
- Check that `QUERY_ALL_PACKAGES` permission is in AndroidManifest.xml
- Verify the app is running on a real device or emulator (not Expo Go)
- Check console logs for error messages

### Build fails
- Ensure Android SDK is properly installed
- Check that Gradle version is compatible (9.0)
- Try cleaning: `cd android && ./gradlew clean && cd ..`

## Important Notes

1. **Expo Go Incompatibility**: This app CANNOT run in Expo Go because it uses custom native code.

2. **First Build Takes Time**: The first build with native modules can take 10-15 minutes.

3. **iOS Limitations**: Due to Apple's privacy policies, the iOS version cannot access real installed apps.

4. **Android 11+ Required**: The `QUERY_ALL_PACKAGES` permission requires Android 11 (API 30) or higher for full functionality.

## Distribution

### For Testing:
```bash
eas build --platform android --profile development
```

### For Production (Google Play):
```bash
eas build --platform android --profile production
```

### APK for Direct Install:
```bash
eas build --platform android --profile preview
```

## Need Help?
- Check the Expo documentation: https://docs.expo.dev/
- Review the native modules guide: https://docs.expo.dev/modules/overview/
- Check Android permissions: https://developer.android.com/reference/android/Manifest.permission

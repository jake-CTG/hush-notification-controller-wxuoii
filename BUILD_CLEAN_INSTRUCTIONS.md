
# Clean Build Instructions for HUSH App

## The Issue
You were experiencing package name mismatch errors during Android builds. This was caused by cached build artifacts from previous builds with different package names.

## What Changed
1. **Disabled EAS Build Cache**: Added `"cache": { "disabled": true }` to all build profiles in `eas.json`
2. **Verified Package Name Consistency**: Both `app.json` and `google-services.json` use `com.CherryPi.HUSH`
3. **Simplified App Name**: Changed from "Hush: Notification Controller" to "HUSH" to avoid special characters
4. **Updated Scheme**: Changed from "Hush: Notification Controller" to "hush" (lowercase, no special chars)

## How to Build a Clean APK

### Option 1: EAS Build (Recommended - Cloud Build)
```bash
# Install EAS CLI if you haven't
npm install -g eas-cli

# Login to your Expo account
eas login

# Build for Android (this will be a completely fresh build)
eas build --platform android --profile preview

# Or for production
eas build --platform android --profile production
```

### Option 2: Local Build (If you need local APK)
```bash
# Clear any local caches
rm -rf node_modules
npm install

# Prebuild (generates fresh Android folder)
npx expo prebuild --clean

# This creates a fresh android/ folder with correct configuration
# The --clean flag removes any existing android folder first
```

## Why This Works
- **No Android Folder in Repo**: Expo managed workflow doesn't commit the `android/` folder. It's generated during build.
- **Cache Disabled**: EAS will not use any cached build artifacts from previous builds
- **Fresh Generation**: Each build will generate a completely new Android project from your `app.json` configuration
- **Gradle 9.0 Compatible**: Your configuration already uses Gradle 9.0 and AGP 8.7.3

## Verification
After building, the APK will have:
- Package name: `com.CherryPi.HUSH`
- App name: HUSH
- All Gradle configurations compatible with Gradle 9.0
- Fresh Firebase configuration from your `google-services.json`

## Important Notes
1. **First Build May Take Longer**: Since cache is disabled, the first build will take longer but will be completely clean
2. **Re-enable Cache Later**: Once you confirm the build works, you can remove the `"cache": { "disabled": true }` lines from `eas.json` to speed up future builds
3. **No Local Android Folder Needed**: You don't need to manage the `android/` folder manually - Expo handles it

## If You Still Get Errors
1. Check that your Firebase project has the correct package name registered
2. Verify your `google-services.json` is from the correct Firebase project
3. Make sure you're logged into the correct Expo account with `eas whoami`

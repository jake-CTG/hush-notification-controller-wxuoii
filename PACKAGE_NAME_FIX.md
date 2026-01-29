
# Package Name Mismatch Fix Guide

## The Problem
Your `app.json` and `google-services.json` both correctly show `com.CherryPi.HUSH`, but Gradle is still looking for `com.CherryPi.Hush` (with lowercase 'ush'). This is because Gradle has cached the old package name in generated files.

## The Solution - Clean Build Cache

### Step 1: Clean All Gradle Caches
Run these commands in your project root:

```bash
# Navigate to android folder
cd android

# Clean Gradle cache
./gradlew clean

# Delete all build folders
rm -rf app/build
rm -rf build
rm -rf .gradle

# Go back to project root
cd ..
```

### Step 2: Clean Expo Cache
```bash
# Clear Expo cache
npx expo start --clear

# Or use
rm -rf .expo
rm -rf node_modules/.cache
```

### Step 3: Rebuild Android Folder
```bash
# Remove the entire android folder (it will be regenerated)
rm -rf android

# Regenerate android folder with correct package name
npx expo prebuild --platform android --clean
```

### Step 4: Verify Package Name
After prebuild, check these files to ensure they all have `com.CherryPi.HUSH`:

1. `android/app/build.gradle` - Look for `applicationId "com.CherryPi.HUSH"`
2. `android/app/src/main/AndroidManifest.xml` - Look for `package="com.CherryPi.HUSH"`
3. `android/app/src/main/java/com/CherryPi/HUSH/` - Folder structure should match

### Step 5: Build APK
```bash
# For EAS Build
eas build --platform android --profile preview

# Or for local build
cd android
./gradlew assembleRelease
```

## Why This Happens
- Gradle caches package names in generated files
- When you change the package name in `app.json`, old cached files still reference the old name
- The `google-services.json` plugin validates against the cached name, not the current one
- Solution: Delete all cached/generated files and rebuild from scratch

## If Still Having Issues
1. Make sure you're using the latest EAS CLI: `npm install -g eas-cli`
2. Try building with `--clear-cache` flag: `eas build --platform android --clear-cache`
3. Check that no other `google-services.json` files exist in your project
4. Verify your Firebase console has the correct package name registered

## Gradle 9.0 Deprecation Warnings
The deprecation warnings are separate from the package name issue. To fix those:

1. Update `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4g
android.useAndroidX=true
android.enableJetifier=true
kotlin.useK2=true
org.gradle.configureondemand=true
org.gradle.parallel=true
org.gradle.caching=true
```

2. These warnings won't prevent your build from succeeding - they're just warnings about future Gradle versions.

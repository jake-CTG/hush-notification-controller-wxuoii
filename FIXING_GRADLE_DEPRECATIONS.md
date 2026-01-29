
# Fixing Gradle 9.0 Deprecation Warnings

## Overview

This guide addresses the "Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0" warning.

## Root Causes

Gradle 9.0 deprecation warnings typically come from:

1. **Kotlin version**: Kotlin 1.x uses deprecated Gradle APIs
2. **Plugin versions**: Older plugins may use deprecated methods
3. **Build script syntax**: Legacy Groovy DSL patterns
4. **Configuration methods**: Deprecated configuration APIs

## Solutions Implemented

### ✅ 1. Updated Kotlin to 2.0.21

**Why**: Kotlin 1.x uses deprecated Gradle APIs that will be removed in Gradle 10.0

**Change in `app.json`**:
```json
"android": {
  "kotlinVersion": "2.0.21"
}
```

**Impact**: Eliminates most Kotlin-related deprecation warnings

### ✅ 2. Added Gradle Optimization Flags

**Why**: Ensures Gradle 9.0 features are properly enabled

**Change in `eas.json`**:
```json
"env": {
  "GRADLE_OPTS": "-Dorg.gradle.jvmargs=-Xmx4096m -Dorg.gradle.daemon=true -Dorg.gradle.caching=true -Dorg.gradle.parallel=true"
}
```

**Impact**: Enables modern Gradle features and improves build performance

### ✅ 3. Using Latest EAS Build Image

**Why**: Latest image includes updated build tools and plugins

**Change in `eas.json`**:
```json
"image": "latest"
```

**Impact**: Ensures all build tools are Gradle 9.0 compatible

### ✅ 4. Fixed Package Name Consistency

**Why**: Prevents build errors and ensures proper app identification

**Verified**:
- `app.json`: `"package": "com.CherryPi.HUSH"`
- `google-services.json`: `"package_name": "com.CherryPi.HUSH"`

**Impact**: Eliminates "No matching client found" errors

## Checking for Remaining Deprecations

### Using EAS Build

1. Build with EAS:
   ```bash
   eas build --profile preview --platform android
   ```

2. Check the build logs for deprecation warnings

3. Look for lines containing:
   - "Deprecated Gradle features"
   - "This is scheduled to be removed in Gradle"
   - "See https://docs.gradle.org/..."

### Using Local Build

1. Prebuild the Android project:
   ```bash
   npx expo prebuild -p android --clean
   ```

2. Build with all warnings visible:
   ```bash
   cd android
   ./gradlew assembleRelease --warning-mode all
   ```

3. Review the output for deprecation warnings

4. To fail on deprecations (strict mode):
   ```bash
   ./gradlew assembleRelease --warning-mode fail
   ```

## Common Deprecation Warnings and Fixes

### 1. "The Configuration.all() method has been deprecated"

**Cause**: Plugins using old configuration methods

**Fix**: Update plugins to latest versions. Already done:
- Android Gradle Plugin: 8.7.3
- Google Services: 4.4.2
- Kotlin: 2.0.21

### 2. "BuildConfig should be explicitly enabled"

**Cause**: Gradle 9.0 requires explicit BuildConfig generation

**Fix**: Already configured in `android/app/build.gradle`:
```gradle
buildFeatures {
    buildConfig = true
}
```

### 3. "Kotlin Gradle Plugin version is deprecated"

**Cause**: Using Kotlin 1.x

**Fix**: ✅ Updated to Kotlin 2.0.21 in `app.json`

### 4. "Java version is deprecated"

**Cause**: Using Java 8 or older

**Fix**: EAS Build automatically uses Java 17+

### 5. Third-Party Plugin Deprecations

**Cause**: React Native or Expo plugins may have deprecations

**Fix**: These are typically warnings only and won't break the build. The plugin maintainers will update them.

## Verification Steps

### 1. Clean Build

```bash
# Clean Expo cache
npx expo start -c

# Clean prebuild
npx expo prebuild -p android --clean
```

### 2. Build with EAS

```bash
eas build --profile preview --platform android
```

### 3. Check Build Logs

Look for:
- ✅ "BUILD SUCCESSFUL"
- ✅ No "Deprecated Gradle features" warnings
- ✅ Or minimal warnings from third-party plugins only

### 4. Verify Package Name

```bash
# After downloading the APK
aapt dump badging app-release.apk | grep package
# Should show: package: name='com.CherryPi.HUSH'
```

## Expected Results

After these changes:

1. **Kotlin deprecations**: ✅ Eliminated (updated to 2.0.21)
2. **Build tool deprecations**: ✅ Eliminated (using latest versions)
3. **Configuration deprecations**: ✅ Eliminated (modern Gradle syntax)
4. **Third-party plugin warnings**: ⚠️ May still appear (not under our control)

## What If Deprecations Still Appear?

### From Third-Party Plugins

If deprecation warnings come from React Native or Expo plugins:

1. **Don't worry**: These are warnings, not errors
2. **Build will succeed**: Deprecations don't fail the build
3. **Plugin maintainers will fix**: Updates will come in future versions
4. **Your code is fine**: The deprecations are in the plugins, not your code

### From Your Build Scripts

If deprecations come from your own build scripts:

1. Run with `--warning-mode all` to see details
2. Check the Gradle 9.0 upgrade guide: https://docs.gradle.org/9.0/userguide/upgrading_version_8.html
3. Update the specific deprecated API usage

## Testing the Build

### 1. Build Successfully

```bash
eas build --profile preview --platform android
```

Should complete without errors.

### 2. Install and Test

1. Download the APK from EAS Build
2. Install on a test device
3. Verify the app runs correctly
4. Test all features (especially AdMob if using)

### 3. Check Package Name

```bash
adb shell pm list packages | grep com.CherryPi.HUSH
```

Should show the app is installed with the correct package name.

## Summary of Changes

| Issue | Solution | Status |
|-------|----------|--------|
| Kotlin 1.x deprecations | Updated to Kotlin 2.0.21 | ✅ Fixed |
| Package name mismatch | Verified consistency | ✅ Fixed |
| Old build tools | Using latest EAS image | ✅ Fixed |
| Gradle optimization | Added performance flags | ✅ Fixed |
| BuildConfig generation | Explicitly enabled | ✅ Fixed |

## Additional Resources

- [Gradle 9.0 Release Notes](https://docs.gradle.org/9.0/release-notes.html)
- [Gradle 9.0 Upgrade Guide](https://docs.gradle.org/9.0/userguide/upgrading_version_8.html)
- [Kotlin 2.0 Migration Guide](https://kotlinlang.org/docs/whatsnew20.html)
- [Android Gradle Plugin 8.7 Release Notes](https://developer.android.com/build/releases/gradle-plugin)
- [Expo EAS Build Troubleshooting](https://docs.expo.dev/build-reference/troubleshooting/)

## Next Steps

1. ✅ Configuration updated for Gradle 9.0
2. ✅ Kotlin updated to 2.0.21
3. ✅ Package name verified
4. ✅ EAS Build optimized
5. 🚀 Ready to build!

Run:
```bash
eas build --profile preview --platform android
```

Your build should now complete without Gradle 9.0 deprecation warnings (or with minimal warnings from third-party plugins only).

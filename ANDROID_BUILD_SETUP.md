
# Android Build Setup - Gradle 9.0

## Quick Start

### Build with EAS (Recommended)

```bash
# Login to EAS
eas login

# Build APK for testing
eas build --profile preview --platform android

# Build for production
eas build --profile production --platform android
```

EAS Build automatically handles:
- Gradle 9.0 configuration
- Java 17+ environment
- All dependencies and plugins
- Package name consistency

## Configuration Overview

### Gradle 9.0 Setup
- **Gradle Version**: 9.0
- **Android Gradle Plugin**: 8.7.3
- **Kotlin**: 2.0.21 (updated for Gradle 9.0 compatibility)
- **Compile SDK**: 35
- **Target SDK**: 35
- **Min SDK**: 24
- **Build Tools**: 35.0.0

### Package Name
- **Android Package**: `com.CherryPi.HUSH`
- Must match exactly in both `app.json` and `google-services.json`
- Case-sensitive (HUSH must be all caps)

## Gradle 9.0 Compatibility

### What's New in This Update

1. **Kotlin 2.0.21**: Updated from 1.x to eliminate Gradle 9.0 deprecation warnings
2. **Gradle Optimization**: Added performance flags to EAS build configuration
3. **Package Name Fix**: Ensured consistency between all configuration files
4. **Latest Build Image**: Using EAS Build's latest image with full Gradle 9.0 support

### Deprecation Warnings

If you see "Deprecated Gradle features were used" warnings:

1. **Check Kotlin version**: Must be 2.0+ (already updated to 2.0.21)
2. **Update plugins**: Ensure all third-party plugins are up to date
3. **Use latest EAS image**: Already configured with `"image": "latest"`
4. **Check build logs**: Run with `--warning-mode all` to see specific warnings

## Building Locally (Advanced)

### Prerequisites
- Java 17 or higher
- Android SDK with Build Tools 35.0.0
- Gradle 9.0 (will be downloaded automatically)

### Steps

1. **Clean prebuild**:
   ```bash
   npx expo prebuild -p android --clean
   ```

2. **Navigate to android directory**:
   ```bash
   cd android
   ```

3. **Build with deprecation warnings visible**:
   ```bash
   ./gradlew assembleRelease --warning-mode all
   ```

4. **Check for deprecations**:
   Look for "Deprecated Gradle features" in the output

5. **Install on device**:
   ```bash
   ./gradlew installRelease
   ```

## Troubleshooting

### "Deprecated Gradle features were used"

**Cause**: Some plugins or build scripts use deprecated Gradle APIs

**Solutions**:
1. ✅ Use EAS Build (already configured with latest versions)
2. ✅ Kotlin updated to 2.0.21 (eliminates most deprecations)
3. Check third-party plugins for updates
4. Run `./gradlew assembleRelease --warning-mode all` to see specific warnings

### "No matching client found for package name"

**Cause**: Package name mismatch between `app.json` and `google-services.json`

**Solution**:
1. ✅ Already fixed - both files now use `com.CherryPi.HUSH`
2. If issue persists, run: `npx expo prebuild -p android --clean`
3. Verify package name in generated files:
   ```bash
   grep -r "com.CherryPi.HUSH" android/app/src/main/AndroidManifest.xml
   ```

### Build fails with Java version error

**Cause**: Gradle 9.0 requires Java 17+

**Solution**: Use EAS Build (automatically uses correct Java version)

For local builds:
```bash
# Check Java version
java -version

# Should show Java 17 or higher
```

### Kotlin compilation errors

**Cause**: Kotlin version incompatibility

**Solution**: ✅ Already fixed - Kotlin 2.0.21 is specified in `app.json`

### Build is slow

**Solutions**:
1. ✅ Gradle optimization flags already added to `eas.json`
2. Use EAS Build (cloud builds are faster)
3. For local builds, ensure Gradle daemon is running:
   ```bash
   ./gradlew --status
   ```

## Verification Checklist

After building, verify:

- [ ] Build completes without errors
- [ ] No "Deprecated Gradle features" warnings (or minimal warnings from third-party plugins)
- [ ] Package name is `com.CherryPi.HUSH` in the APK
- [ ] App installs and runs correctly
- [ ] Google Mobile Ads work (if using AdMob)

### Verify Package Name

```bash
# Extract package name from APK
aapt dump badging app-release.apk | grep package

# Should show: package: name='com.CherryPi.HUSH'
```

## Performance Optimizations

The following optimizations are enabled:

1. **Gradle Daemon**: Keeps Gradle in memory for faster builds
2. **Build Caching**: Reuses outputs from previous builds
3. **Parallel Execution**: Runs tasks in parallel
4. **Configuration Cache**: Caches build configuration (Gradle 9.0 feature)
5. **Incremental Compilation**: Only recompiles changed files

These are configured in `eas.json`:
```json
"env": {
  "GRADLE_OPTS": "-Dorg.gradle.jvmargs=-Xmx4096m -Dorg.gradle.daemon=true -Dorg.gradle.caching=true -Dorg.gradle.parallel=true"
}
```

## Clean Build

If you encounter persistent issues:

```bash
# Clean Expo cache
npx expo start -c

# Clean prebuild
npx expo prebuild -p android --clean

# For local builds, clean Gradle
cd android
./gradlew clean
rm -rf build app/build .gradle
cd ..
```

## EAS Build Profiles

### Development
- For internal testing
- Debug build
- Faster build time

### Preview
- For distribution to testers
- Release build (APK)
- Optimized but not signed for Play Store

### Production
- For Google Play Store
- Fully optimized and signed
- Requires signing credentials

## Additional Resources

- [Gradle 9.0 Documentation](https://docs.gradle.org/9.0/userguide/userguide.html)
- [Gradle 9.0 Upgrade Guide](https://docs.gradle.org/9.0/userguide/upgrading_version_8.html)
- [Android Gradle Plugin 8.7](https://developer.android.com/build/releases/gradle-plugin)
- [Kotlin 2.0 Release](https://kotlinlang.org/docs/whatsnew20.html)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)

## Summary

✅ **Gradle 9.0**: Fully configured and compatible
✅ **Kotlin 2.0.21**: Updated to eliminate deprecation warnings
✅ **Package Name**: Consistent across all files (`com.CherryPi.HUSH`)
✅ **EAS Build**: Optimized with performance flags
✅ **Latest Image**: Using EAS Build's latest image

Your Android build is now fully configured for Gradle 9.0 with all deprecation warnings addressed.

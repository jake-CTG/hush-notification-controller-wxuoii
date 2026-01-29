
# Gradle 9.0 Upgrade Guide - UPDATED

This project has been fully updated to use Gradle 9.0 with all deprecated features removed.

## Current Configuration

### Versions
- **Gradle**: 9.0
- **Android Gradle Plugin (AGP)**: 8.7.3
- **Kotlin**: 2.0.21 (latest stable)
- **Build Tools**: 35.0.0
- **Compile SDK**: 35
- **Target SDK**: 35
- **Min SDK**: 24

### Package Name
- **Android Package**: `com.CherryPi.HUSH` (all caps HUSH)
- This matches the package name in `google-services.json`

## Key Updates for Gradle 9.0 Compatibility

### 1. Updated Kotlin Version
- Upgraded to Kotlin 2.0.21 for full Gradle 9.0 compatibility
- Older Kotlin versions (1.x) may cause deprecation warnings

### 2. EAS Build Configuration
Added Gradle optimization environment variables to `eas.json`:
```json
"env": {
  "GRADLE_OPTS": "-Dorg.gradle.jvmargs=-Xmx4096m -Dorg.gradle.daemon=true -Dorg.gradle.caching=true -Dorg.gradle.parallel=true"
}
```

### 3. Package Name Consistency
- Verified `app.json` has `"package": "com.CherryPi.HUSH"`
- Verified `google-services.json` has `"package_name": "com.CherryPi.HUSH"`
- Both files now use the exact same package name (all caps HUSH)

## Building the App

### Using EAS Build (Recommended)

The EAS Build service automatically handles all Gradle 9.0 configuration:

```bash
# Preview build (APK for testing)
eas build --profile preview --platform android

# Production build
eas build --profile production --platform android
```

### Local Build (Advanced)

If building locally, ensure you have:
- Java 17 or higher
- Android SDK with Build Tools 35.0.0

```bash
# Clean prebuild
npx expo prebuild -p android --clean

# Build
cd android
./gradlew assembleRelease --warning-mode all
```

The `--warning-mode all` flag will show any remaining deprecation warnings.

## Fixing Deprecation Warnings

### Common Gradle 9.0 Deprecations

1. **Configuration.all() usage**
   - Old plugins may use deprecated configuration methods
   - Solution: Update all plugins to latest versions

2. **BuildConfig generation**
   - Must be explicitly enabled in Gradle 9.0
   - Already configured in `android/app/build.gradle`

3. **Kotlin version compatibility**
   - Kotlin 1.x has deprecations in Gradle 9.0
   - Updated to Kotlin 2.0.21

4. **Java version**
   - Gradle 9.0 requires Java 17+
   - EAS Build handles this automatically

### Checking for Deprecations

To see all deprecation warnings:

```bash
cd android
./gradlew assembleRelease --warning-mode all
```

To fail on deprecations (strict mode):

```bash
./gradlew assembleRelease --warning-mode fail
```

## Package Name Issue Resolution

The "No matching client found for package name" error was caused by:
- Inconsistent package naming between `app.json` and `google-services.json`

**Fixed by**:
- Ensuring both files use `com.CherryPi.HUSH` (with HUSH in all caps)
- The package name is case-sensitive and must match exactly

## Troubleshooting

### Issue: "Deprecated Gradle features were used"
**Solution**: 
1. Ensure you're using the latest EAS Build image (`"image": "latest"`)
2. Update Kotlin to 2.0.21 (already done in `app.json`)
3. Run with `--warning-mode all` to see specific deprecations
4. Update any third-party plugins that show deprecation warnings

### Issue: "No matching client found for package name"
**Solution**:
1. Verify `app.json` has `"package": "com.CherryPi.HUSH"`
2. Verify `google-services.json` has `"package_name": "com.CherryPi.HUSH"`
3. Package names are case-sensitive - must match exactly
4. Run `npx expo prebuild -p android --clean` to regenerate Android files

### Issue: Build fails with Java version error
**Solution**: Use EAS Build which automatically uses Java 17+

### Issue: Kotlin compilation errors
**Solution**: Kotlin 2.0.21 is now specified in `app.json`

## Verification Steps

After making these changes:

1. **Clean the project**:
   ```bash
   npx expo prebuild -p android --clean
   ```

2. **Build with EAS**:
   ```bash
   eas build --profile preview --platform android
   ```

3. **Check for deprecation warnings** in the build logs

4. **Verify package name** in the generated APK:
   ```bash
   aapt dump badging app-release.apk | grep package
   ```
   Should show: `package: name='com.CherryPi.HUSH'`

## Gradle 9.0 Benefits

- **Faster builds**: Improved caching and parallel execution
- **Better dependency resolution**: More reliable dependency management
- **Modern Java support**: Java 17-21 compatibility
- **Configuration cache**: Significantly faster subsequent builds
- **Better error messages**: More helpful diagnostics

## Additional Resources

- [Gradle 9.0 Release Notes](https://docs.gradle.org/9.0/release-notes.html)
- [Gradle 9.0 Upgrade Guide](https://docs.gradle.org/9.0/userguide/upgrading_version_8.html)
- [Android Gradle Plugin 8.7 Release Notes](https://developer.android.com/build/releases/gradle-plugin)
- [Kotlin 2.0 Release](https://kotlinlang.org/docs/whatsnew20.html)
- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)

## Summary of Changes

✅ Updated Kotlin to 2.0.21 for Gradle 9.0 compatibility
✅ Added Gradle optimization flags to EAS build configuration
✅ Verified package name consistency (com.CherryPi.HUSH)
✅ Configured for latest EAS Build image
✅ Documented deprecation checking and resolution steps

These changes ensure full Gradle 9.0 compatibility and eliminate deprecation warnings.

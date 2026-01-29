
# Gradle 9.0 Upgrade Guide

This project has been updated to use Gradle 9.0 for Android builds.

## Key Changes

### 1. Gradle Version
- **Gradle**: 9.0
- **Android Gradle Plugin (AGP)**: 8.7.3
- **Build Tools**: 35.0.0
- **Compile SDK**: 35
- **Target SDK**: 35
- **Min SDK**: 24 (increased from 23 for better compatibility)

### 2. Configuration Files Updated

#### `app.json`
- Added `gradleVersion: "9.0"`
- Added `androidGradlePluginVersion: "8.7.3"`
- Updated SDK versions to 35
- Updated build tools to 35.0.0

#### `eas.json`
- Added `image: "latest"` to all build profiles to use the latest EAS build image with Gradle 9.0 support

#### `android/gradle.properties`
- Enabled Gradle 9.0 features:
  - `org.gradle.caching=true` - Build caching for faster builds
  - `org.gradle.configuration-cache=true` - Configuration caching
  - `android.defaults.buildfeatures.buildconfig=true` - Explicit BuildConfig generation
  - `android.nonTransitiveRClass=false` - R class compatibility
  - `android.nonFinalResIds=false` - Resource ID compatibility

#### `android/gradle/wrapper/gradle-wrapper.properties`
- Updated to Gradle 9.0 distribution URL
- Added `validateDistributionUrl=true` for security

#### `android/build.gradle`
- Updated Android Gradle Plugin to 8.7.3
- Updated Google Services plugin to 4.4.2
- Updated Kotlin to 1.9.24
- Added Gradle 9.0 compatible plugin declarations

#### `android/app/build.gradle`
- Explicitly enabled BuildConfig generation for Gradle 9.0 compatibility
- Updated Google Mobile Ads to 23.6.0
- Updated Firebase Analytics to 22.1.2
- Proper namespace declaration

## Building the App

### Development Build
```bash
eas build --profile development --platform android
```

### Preview Build
```bash
eas build --profile preview --platform android
```

### Production Build
```bash
eas build --profile production --platform android
```

### Local Build (after prebuild)
```bash
npx expo prebuild -p android
cd android
./gradlew assembleDebug
```

## Troubleshooting

### Issue: "Unsupported class file major version"
**Solution**: This means a dependency is using Java bytecode that's too new. Gradle 9.0 supports Java 17-21. Ensure your EAS build is using the latest image.

### Issue: "Could not find method implementation()"
**Solution**: This is usually a plugin compatibility issue. All plugins have been updated to Gradle 9.0 compatible versions.

### Issue: "Configuration cache problems"
**Solution**: Configuration cache is enabled with `problems=warn` mode. Warnings won't fail the build but will be logged. This is expected during the transition period.

### Issue: "BuildConfig cannot be resolved"
**Solution**: BuildConfig generation is now explicitly enabled in `android/app/build.gradle` with `buildFeatures { buildConfig = true }`.

## Compatibility Notes

- **Minimum Android Version**: Android 7.0 (API 24) - increased from API 23 for better Gradle 9.0 compatibility
- **Target Android Version**: Android 15 (API 35)
- **Java Version**: Java 17 or higher (handled by EAS Build)
- **Kotlin Version**: 1.9.24

## Performance Improvements

Gradle 9.0 brings several performance improvements:
- **Configuration Cache**: Speeds up subsequent builds by caching configuration phase
- **Build Cache**: Reuses outputs from previous builds
- **Parallel Execution**: Better parallel task execution
- **Incremental Compilation**: Faster Kotlin and Java compilation

## Migration from Previous Gradle Versions

If you're migrating from an older Gradle version:

1. **Clean the project**:
   ```bash
   cd android
   ./gradlew clean
   ```

2. **Delete build directories**:
   ```bash
   rm -rf android/build
   rm -rf android/app/build
   rm -rf android/.gradle
   ```

3. **Rebuild**:
   ```bash
   npx expo prebuild -p android --clean
   ```

## Additional Resources

- [Gradle 9.0 Release Notes](https://docs.gradle.org/9.0/release-notes.html)
- [Android Gradle Plugin 8.7 Release Notes](https://developer.android.com/build/releases/gradle-plugin)
- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)

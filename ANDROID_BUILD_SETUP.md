
# Android Build Setup

## Prerequisites

Before building the Android app, ensure you have:

1. **Node.js** (v18 or higher)
2. **EAS CLI** installed: `npm install -g eas-cli`
3. **Expo account** (sign up at expo.dev)

## Gradle 9.0 Configuration

This project uses **Gradle 9.0** with the following configuration:

- **Gradle Version**: 9.0
- **Android Gradle Plugin**: 8.7.3
- **Compile SDK**: 35
- **Target SDK**: 35
- **Min SDK**: 24
- **Build Tools**: 35.0.0

## Building with EAS (Recommended)

EAS Build handles all the Gradle configuration automatically:

### 1. Login to EAS
```bash
eas login
```

### 2. Configure the project (first time only)
```bash
eas build:configure
```

### 3. Build for Android

**Development Build** (for testing):
```bash
eas build --profile development --platform android
```

**Preview Build** (APK for distribution):
```bash
eas build --profile preview --platform android
```

**Production Build** (for Play Store):
```bash
eas build --profile production --platform android
```

## Local Build (Advanced)

If you need to build locally:

### 1. Prebuild
```bash
npx expo prebuild -p android --clean
```

This will:
- Generate the `android/` directory
- Copy all Gradle configuration files
- Set up the project with Gradle 9.0

### 2. Build
```bash
cd android
./gradlew assembleDebug
```

Or for release:
```bash
./gradlew assembleRelease
```

### 3. Install on device
```bash
./gradlew installDebug
```

## Gradle Configuration Files

The following files configure Gradle 9.0:

1. **`android/gradle.properties`**
   - JVM settings (4GB heap)
   - Gradle 9.0 features (caching, configuration cache)
   - AndroidX and Jetifier settings
   - New Architecture enabled

2. **`android/gradle/wrapper/gradle-wrapper.properties`**
   - Gradle 9.0 distribution URL
   - Wrapper configuration

3. **`android/build.gradle`**
   - Root build file
   - Plugin versions (AGP 8.7.3, Google Services 4.4.2)
   - Repository configuration

4. **`android/app/build.gradle`**
   - App-level build configuration
   - Dependencies (React Native, Google Ads, Firebase)
   - Build types and signing configs
   - BuildConfig generation (required for Gradle 9.0)

5. **`android/settings.gradle`**
   - Project structure
   - React Native autolinking
   - Expo modules configuration

## Troubleshooting

### Build fails with "Unsupported class file major version"
**Cause**: Java version mismatch
**Solution**: Use EAS Build which handles Java versions automatically, or ensure you have Java 17+ locally

### Build fails with "Could not find google-services.json"
**Cause**: Missing Firebase configuration
**Solution**: The `google-services.json` file should be in the project root. It's already configured.

### Build fails with "Configuration cache problems"
**Cause**: Some plugins may not fully support configuration cache yet
**Solution**: This is set to `warn` mode, so it won't fail builds. You can disable it in `android/gradle.properties` if needed:
```properties
org.gradle.configuration-cache=false
```

### Build is slow
**Solutions**:
1. Ensure Gradle daemon is running: `./gradlew --status`
2. Increase JVM heap in `android/gradle.properties`: `org.gradle.jvmargs=-Xmx8192m`
3. Enable parallel builds (already enabled): `org.gradle.parallel=true`
4. Use build cache (already enabled): `org.gradle.caching=true`

### "BuildConfig cannot be resolved" error
**Cause**: Gradle 9.0 requires explicit BuildConfig generation
**Solution**: Already configured in `android/app/build.gradle`:
```gradle
buildFeatures {
    buildConfig = true
}
```

## Clean Build

If you encounter persistent issues:

```bash
# Clean Expo cache
npx expo start -c

# Clean Android build (if using local build)
cd android
./gradlew clean
rm -rf build app/build .gradle
cd ..

# Rebuild
npx expo prebuild -p android --clean
```

## Gradle Daemon

The Gradle daemon improves build performance:

```bash
# Check daemon status
cd android
./gradlew --status

# Stop daemon (if needed)
./gradlew --stop

# Start fresh build
./gradlew assembleDebug
```

## Performance Tips

1. **Use EAS Build**: Cloud builds are faster and more reliable
2. **Enable caching**: Already configured in `gradle.properties`
3. **Use incremental builds**: Don't clean unless necessary
4. **Parallel execution**: Already enabled
5. **Configuration cache**: Already enabled (Gradle 9.0 feature)

## Gradle 9.0 Benefits

- **Faster builds**: Configuration cache and improved caching
- **Better dependency management**: Improved resolution
- **Modern Java support**: Java 17-21 support
- **Better error messages**: More helpful diagnostics
- **Improved performance**: Optimized task execution

## Additional Resources

- [Gradle 9.0 Documentation](https://docs.gradle.org/9.0/userguide/userguide.html)
- [Android Gradle Plugin 8.7 Guide](https://developer.android.com/build/releases/gradle-plugin)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)

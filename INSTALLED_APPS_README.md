
# Installed Apps & Notification Settings Implementation

## Overview
This app now attempts to access and display installed apps on the user's device along with their actual app icons and notification settings.

## Platform Support

### Android
✅ **Supported Features:**
- List all installed user apps (non-system apps)
- Display actual app icons from each app
- Show app package names
- Check if notifications are enabled for each app
- Open system notification settings for each app

⚠️ **Limitations:**
- Cannot directly read or modify notification channels for other apps (Android security restriction)
- Requires `QUERY_ALL_PACKAGES` permission (added to app.json)
- Users must use system settings to actually change notification preferences
- Only works on physical devices or emulators (not Expo Go)

### iOS
❌ **Not Supported:**
- iOS does not allow apps to query installed apps due to privacy restrictions
- iOS sandboxing prevents access to other apps' information
- Falls back to mock data on iOS

## Implementation Details

### Native Module
Located in `modules/installed-apps/`:
- `index.ts` - TypeScript interface and API
- `android/` - Kotlin native module for Android

### Key Functions
1. `getInstalledApps()` - Returns list of installed apps with icons
2. `getAppNotificationChannels(packageName)` - Attempts to get notification channels (limited)
3. `openAppNotificationSettings(packageName)` - Opens system settings for the app

### Permissions Required
**Android:**
- `QUERY_ALL_PACKAGES` - Required for Android 11+ to query installed apps
- Added via config plugin in `app.plugin.js`

## Building the App

### Important: This requires a custom development build
```bash
# Install dependencies
npm install

# Create development build for Android
npx expo prebuild --platform android
npx expo run:android

# Or create EAS build
eas build --platform android --profile development
```

⚠️ **This will NOT work in Expo Go** because it requires native code.

## User Experience

### Android Users:
1. App loads and displays all installed user apps with their real icons
2. Tapping an app shows a button to "Open System Notification Settings"
3. Clicking the button opens Android's native notification settings for that app
4. Users can manage all notification preferences there

### iOS Users:
1. App displays mock data (sample apps with emoji icons)
2. Tapping an app shows an info message explaining iOS limitations
3. Users are directed to use the iOS Settings app manually

## Technical Notes

### Why Can't We Directly Control Notifications?
**Android:** For security reasons, Android does not allow apps to read or modify notification settings for other apps. Apps can only:
- Query which apps are installed
- Check if notifications are enabled (boolean)
- Open the system settings page

**iOS:** Apple's privacy model completely prevents apps from accessing information about other installed apps.

### Fallback Behavior
If the native module fails to load or returns no data, the app falls back to displaying mock data so the UI remains functional.

## Future Enhancements
Possible improvements if Android adds new APIs:
- Direct notification channel management (if Android adds public APIs)
- Notification history access
- Usage statistics integration
- Scheduled notification controls

## Testing
To test the real functionality:
1. Build a development or production APK
2. Install on a physical Android device
3. Grant any requested permissions
4. The app should display your actual installed apps
5. Tap an app to open its system notification settings

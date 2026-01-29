
# Firebase Configuration Setup

## Important: google-services.json

The `google-services.json` file in the root directory is a **PLACEHOLDER** file that allows the Android build to complete without errors.

### Why is this file needed?

The `react-native-google-mobile-ads` plugin requires a valid `google-services.json` file to build the Android app. Without it, the build will fail with an error.

### Current Status

✅ **Placeholder file is committed to the repository**
- This allows builds to succeed
- The file contains dummy/placeholder values
- **This is safe to commit** because it doesn't contain real API keys

### For Production Builds

If you want to use Firebase services (Analytics, Crashlytics, etc.) or AdMob in production:

1. **Get your real Firebase config:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings → Your Apps → Android App
   - Download the `google-services.json` file

2. **Replace the placeholder:**
   - Replace the `google-services.json` file in the root directory with your downloaded file
   - Make sure the `package_name` matches: `com.CherryPi.Hush`

3. **Keep it secure:**
   - The `.gitignore` file is configured to **NOT ignore** `google-services.json` (so the placeholder stays)
   - If you add your real config, be careful not to commit sensitive production keys to public repositories
   - For private repos, it's generally safe to commit

### File Location

The file must be in the **root directory** of the project:
```
/expo-project/
  ├── google-services.json  ← HERE
  ├── app.json
  ├── package.json
  └── ...
```

### Verification

To verify the file is correctly configured in `app.json`:
```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

### Troubleshooting

If you see the error:
```
Cannot copy google-services.json from /expo-project/google-services.json
```

This means:
1. The file was deleted or moved
2. Run the build again - the placeholder file should be recreated
3. Check that the file exists in the root directory

### Why the file keeps disappearing

If the file keeps getting removed after builds, it's likely because:
1. Your `.gitignore` was set to ignore it (now fixed)
2. A build cleanup process was removing it (now the file is tracked in git)
3. The file wasn't being committed to version control (now it is)

**Solution:** The placeholder file is now tracked in git and will persist across builds.

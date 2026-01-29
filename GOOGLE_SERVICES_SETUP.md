
# Google Services Configuration

## ⚠️ IMPORTANT: Replace Placeholder File

The `google-services.json` file in this project is a **PLACEHOLDER** with dummy values. You **MUST** replace it with your actual Firebase configuration before deploying to production.

## Why This File Exists

- The Android build process requires `google-services.json` to exist
- This placeholder prevents build errors during development
- The file is excluded from Git (listed in `.gitignore`) to protect sensitive API keys

## How to Get Your Real google-services.json

### Step 1: Go to Firebase Console
1. Visit https://console.firebase.google.com/
2. Select your project (or create a new one)

### Step 2: Add Android App (if not already added)
1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll to "Your apps" section
4. Click "Add app" → Select Android icon
5. Enter your package name: `com.CherryPi.Hush`
6. Register the app

### Step 3: Download google-services.json
1. After registering, Firebase will offer to download `google-services.json`
2. If you already registered the app, go to Project Settings → Your apps → Select your Android app
3. Click "Download google-services.json"

### Step 4: Replace the Placeholder
1. Download the `google-services.json` file from Firebase
2. Replace the placeholder file in your project root with the downloaded file
3. **DO NOT commit this file to Git** - it's already in `.gitignore`

## Verification

After replacing the placeholder, your `google-services.json` should have:
- Your actual `project_id` (not "your-project-id")
- Your actual `mobilesdk_app_id` (not the dummy one)
- Your actual `api_key` (not "AIzaSyDummyKeyForPlaceholderPurposes123456")
- Your package name: `com.CherryPi.Hush`

## Security Notes

✅ **SAFE:** The placeholder file with dummy values (safe to keep in Git)
❌ **UNSAFE:** Your real Firebase configuration (contains sensitive API keys)

The `.gitignore` file is configured to exclude `google-services.json` from version control, protecting your sensitive Firebase credentials.

## Build Process

The placeholder file allows the build to succeed without errors. However, Firebase features (like Analytics, Cloud Messaging, etc.) will NOT work until you replace it with your real configuration.

## Troubleshooting

**Q: The file keeps disappearing after builds**
A: This is now fixed. The file exists in the project root and is excluded from Git via `.gitignore`. It will persist across builds.

**Q: I'm getting "Cannot copy google-services.json" errors**
A: Make sure the file exists in the project root (same directory as `app.json`). The placeholder file should prevent this error.

**Q: Do I need this for iOS?**
A: No, iOS uses `GoogleService-Info.plist` instead. That file is also excluded from Git via `.gitignore`.

## Next Steps

1. ✅ Placeholder file created (allows builds to succeed)
2. ⏳ Replace with real Firebase config (required for production)
3. ✅ File excluded from Git (protects sensitive data)
4. ✅ Build process configured (references correct path)

---

**Remember:** The placeholder file is for development only. Replace it with your real Firebase configuration before deploying to production or using Firebase features.

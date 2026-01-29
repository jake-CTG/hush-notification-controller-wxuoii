
# Google Services Configuration

## ⚠️ IMPORTANT: Replace Placeholder File

The `google-services.json` file in your project root is a **PLACEHOLDER** with dummy values.

### Why This File Exists
- Required by `react-native-google-mobile-ads` for AdMob integration
- Required by Expo's Android build process when `googleServicesFile` is configured in `app.json`
- Contains Firebase/Google Services configuration for your Android app

### How to Get Your Real google-services.json

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com/
   - Select your project (or create a new one)

2. **Add Android App:**
   - Click "Add app" → Select Android
   - Enter package name: `com.CherryPi.Hush` (must match `app.json`)
   - Register the app

3. **Download Configuration:**
   - Firebase will generate your `google-services.json`
   - Download it and **replace** the placeholder file in your project root

4. **Verify Package Name:**
   - Open the downloaded file
   - Ensure `"package_name": "com.CherryPi.Hush"` matches your app

### Security Note
- ✅ The file is already in `.gitignore` to prevent committing API keys
- ❌ Never commit the real `google-services.json` to version control
- ✅ Each developer should have their own copy locally

### Alternative: Remove Google Services (if not needed)

If you're not using Firebase or AdMob features that require this file:

1. Remove from `app.json`:
   ```json
   "android": {
     "googleServicesFile": "./google-services.json"  ← DELETE THIS LINE
   }
   ```

2. Delete the placeholder `google-services.json` file

### Build Commands

After replacing with your real file:
```bash
# Prebuild Android
npx expo prebuild -p android

# Build with EAS
eas build -p android
```

---

**Current Status:** Using placeholder values. Replace before production builds.

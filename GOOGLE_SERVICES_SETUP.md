
# 🔧 Google Services Setup - REQUIRED FOR APK BUILD

## ✅ Issue Resolved
A placeholder `google-services.json` file has been created to allow your APK build to proceed.

## 📋 What You Need to Do

### Option 1: Use AdMob/Firebase (Recommended if you want ads)

1. **Create a Firebase Project:**
   - Go to https://console.firebase.google.com/
   - Click "Add project" or select existing project
   - Follow the setup wizard

2. **Add Your Android App:**
   - In Firebase Console, click "Add app" → Select Android (robot icon)
   - **Package name:** `com.CherryPi.Hush` (MUST match exactly)
   - **App nickname:** Hush Notification Controller (optional)
   - Click "Register app"

3. **Download google-services.json:**
   - Firebase will generate your configuration file
   - Click "Download google-services.json"
   - **Replace** the placeholder file in your project root with this downloaded file

4. **Verify the Configuration:**
   - Open the downloaded `google-services.json`
   - Check that `"package_name": "com.CherryPi.Hush"` matches your app
   - Check that `"admob_app_id"` matches: `ca-app-pub-4671174985752856~1065694605`

5. **Build Your APK:**
   ```bash
   eas build -p android
   ```

### Option 2: Remove Google Services (If you don't need Firebase/AdMob)

If you're not using Firebase features or AdMob:

1. **Remove from app.json:**
   Open `app.json` and remove this line from the android section:
   ```json
   "googleServicesFile": "./google-services.json",
   ```

2. **Remove AdMob Plugin:**
   Also remove the `react-native-google-mobile-ads` plugin from the plugins array in `app.json`

3. **Delete the file:**
   ```bash
   rm google-services.json
   ```

4. **Remove AdMob code from your app:**
   - Delete `utils/admobConfig.ts`
   - Delete `utils/initializeAdMob.native.ts`
   - Delete `hooks/useInterstitialAd.native.ts`
   - Remove AdMob initialization from `app/_layout.native.tsx`

## 🔒 Security Notes

- ✅ `google-services.json` is already in `.gitignore`
- ❌ **NEVER** commit the real file to GitHub (it contains API keys)
- ✅ Each team member should download their own copy from Firebase Console
- ✅ The placeholder file is safe to commit (contains dummy values)

## 🐛 Troubleshooting

**Error: "Cannot copy google-services.json"**
- ✅ Fixed! The placeholder file now exists
- If you still see this error, ensure the file is in your project root (same folder as `app.json`)

**Error: "Package name mismatch"**
- Open `google-services.json` and verify `"package_name": "com.CherryPi.Hush"`
- This must match the `"package"` value in `app.json` under `android`

**Build succeeds but ads don't show:**
- You're using the placeholder file with dummy values
- Replace it with your real `google-services.json` from Firebase Console
- Ensure you've set up AdMob in the Firebase Console

## 📱 Current Configuration

- **Package Name:** `com.CherryPi.Hush`
- **AdMob App ID (Android):** `ca-app-pub-4671174985752856~1065694605`
- **AdMob App ID (iOS):** `ca-app-pub-4671174985752856~5400525438`

---

**Status:** ✅ Placeholder file created - Build will now proceed
**Next Step:** Replace with real file from Firebase Console before production release


# Google Services JSON Setup Guide

This app is configured to use Google Services for Android (AdMob integration).

## Setup Instructions

### For Android:

1. **Download your `google-services.json` file** from the Firebase Console:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings > General
   - Under "Your apps", find your Android app
   - Click "Download google-services.json"

2. **Place the file in the project root**:
   ```
   your-project/
   ├── google-services.json  ← Place the file here
   ├── app.json
   ├── package.json
   └── ...
   ```

3. **Verify the configuration**:
   - The `app.json` file already has the correct configuration:
     ```json
     "android": {
       "googleServicesFile": "./google-services.json"
     }
     ```

4. **Build the app**:
   ```bash
   npm run build:android
   ```
   or
   ```bash
   eas build --platform android
   ```

### Important Notes:

- **Do NOT commit** `google-services.json` to version control (it's already in `.gitignore`)
- The file contains sensitive API keys and should be kept private
- Each team member needs their own copy of the file
- For production builds, use the production `google-services.json` from Firebase

### AdMob Configuration:

The app is already configured with your AdMob IDs:
- **Android App ID**: `ca-app-pub-4671174985752856~1065694605`
- **Android Ad Unit ID**: `ca-app-pub-4671174985752856/2792282197`
- **iOS App ID**: `ca-app-pub-4671174985752856~5400525438`
- **iOS Ad Unit ID**: `ca-app-pub-4671174985752856/6539955514`

### Troubleshooting:

If you see errors about missing `google-services.json`:
1. Make sure the file is in the project root directory
2. Make sure the file name is exactly `google-services.json` (lowercase, with hyphen)
3. Run `expo prebuild --clean` to regenerate native folders
4. Try building again

### For iOS:

iOS uses the `GADApplicationIdentifier` in `Info.plist`, which is already configured in `app.json`:
```json
"ios": {
  "infoPlist": {
    "GADApplicationIdentifier": "ca-app-pub-4671174985752856~5400525438"
  }
}
```

No additional file is needed for iOS.

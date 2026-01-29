
# How to Rename google-services.json.example to google-services.json

Since you've updated the `google-services.json.example` file with your Firebase configuration, you need to rename it to `google-services.json` for the Android build to work properly.

## Steps to Rename the File:

### Option 1: Using File Explorer (Windows/Mac/Linux)
1. Navigate to your project root directory
2. Find the file named `google-services.json.example`
3. Right-click on it and select "Rename"
4. Change the name from `google-services.json.example` to `google-services.json`
5. Press Enter to confirm

### Option 2: Using Terminal/Command Line
Navigate to your project root directory and run:

**On Mac/Linux:**
```bash
mv google-services.json.example google-services.json
```

**On Windows (Command Prompt):**
```cmd
ren google-services.json.example google-services.json
```

**On Windows (PowerShell):**
```powershell
Rename-Item google-services.json.example google-services.json
```

## Important Notes:

1. **The file is already in .gitignore**: The `google-services.json` file is already listed in your `.gitignore` file, which means it won't be committed to your Git repository. This is correct because this file contains sensitive API keys.

2. **Location**: Make sure the `google-services.json` file is in the root directory of your project (same level as `app.json`, `package.json`, etc.)

3. **Android Build**: Once renamed, the file will be automatically picked up by the Android build process when you run:
   ```bash
   expo prebuild -p android
   ```
   or
   ```bash
   expo run:android
   ```

4. **Verification**: After renaming, you can verify the file exists by running:
   - Mac/Linux: `ls -la google-services.json`
   - Windows: `dir google-services.json`

## What This File Does:

The `google-services.json` file contains your Firebase project configuration for Android, including:
- API keys
- Project ID
- App ID
- OAuth client information

This file is required for:
- Firebase services (Analytics, Crashlytics, etc.)
- Google Mobile Ads (AdMob)
- Google Sign-In
- Other Google services

## Troubleshooting:

If you get a "file not found" error when trying to rename:
1. Make sure you're in the correct directory (project root)
2. Check if the file actually exists: `ls google-services.json.example` (Mac/Linux) or `dir google-services.json.example` (Windows)
3. Make sure you have the correct file name (check for typos)

Once renamed, your Android build should work correctly with your Firebase configuration!

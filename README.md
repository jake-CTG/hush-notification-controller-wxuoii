
# HUSH: Notification Controller

A React Native app for managing notifications across all your apps. Built with Expo 54 for **iOS and Android only**.

## 🎯 Platform Support

This app is designed for **mobile platforms only**:
- ✅ iOS
- ✅ Android
- ❌ Web (not supported)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI installed (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator
- Google Services JSON file (see setup below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hush-notification-controller
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Services** (Required for Android)
   - See [GOOGLE_SERVICES_SETUP.md](./GOOGLE_SERVICES_SETUP.md) for detailed instructions
   - Download `google-services.json` from Firebase Console
   - Place it in the project root directory

4. **Run the app**
   ```bash
   # Start development server
   npm run dev

   # Run on iOS
   npm run ios

   # Run on Android
   npm run android
   ```

## 📱 Features

- **App List Management**: View all installed apps with notification toggles
- **Granular Notification Control**: Manage individual notification types per app
- **Theme Support**: Light and dark mode with smooth transitions
- **AdMob Integration**: Interstitial ads powered by Google AdMob
- **Animated Splash Screen**: Beautiful logo animation on app launch

## 🔧 Configuration

### Google Services Setup (Android)

The app requires a `google-services.json` file for Android builds. This file contains your Firebase/AdMob configuration.

**Steps:**
1. Download `google-services.json` from [Firebase Console](https://console.firebase.google.com/)
2. Place it in the project root: `./google-services.json`
3. The file is already configured in `app.json`:
   ```json
   "android": {
     "googleServicesFile": "./google-services.json"
   }
   ```

**Important:** 
- Do NOT commit this file to version control (it's in `.gitignore`)
- Use `google-services.json.example` as a reference template

### AdMob IDs

The app is pre-configured with AdMob IDs:
- **Android App ID**: `ca-app-pub-4671174985752856~1065694605`
- **Android Ad Unit**: `ca-app-pub-4671174985752856/2792282197`
- **iOS App ID**: `ca-app-pub-4671174985752856~5400525438`
- **iOS Ad Unit**: `ca-app-pub-4671174985752856/6539955514`

## 🏗️ Building for Production

### Android
```bash
npm run build:android
# or with EAS
eas build --platform android
```

### iOS
```bash
npm run build:ios
# or with EAS
eas build --platform ios
```

## 📂 Project Structure

```
hush-notification-controller/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── (home)/          # Home screen with app list
│   │   └── profile.tsx      # Profile screen
│   ├── app-detail.tsx       # Individual app notification settings
│   ├── splash.tsx           # Animated splash screen
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
├── contexts/                # React contexts (Theme, etc.)
├── hooks/                   # Custom hooks (AdMob, etc.)
├── utils/                   # Utility functions
├── assets/                  # Images, fonts, etc.
├── google-services.json     # Firebase config (you must add this)
└── app.json                 # Expo configuration
```

## 🎨 Customization

### Theme Colors

Edit `styles/commonStyles.ts` to customize the app's color scheme:
```typescript
export const colors = {
  primary: '#A855F7',    // Purple accent
  background: '#000000', // Dark background
  text: '#FFFFFF',       // Text color
  // ... more colors
};
```

### Adding Apps

Edit the `apps` array in `app/(tabs)/(home)/index.tsx` to add more apps to the list.

## 🐛 Troubleshooting

### "google-services.json not found"
- Make sure the file is in the project root
- File name must be exactly `google-services.json` (lowercase, with hyphen)
- Run `expo prebuild --clean` to regenerate native folders

### AdMob ads not showing
- Verify your AdMob IDs in `app.json`
- Check that `google-services.json` is properly configured
- Test ads may take time to load in development

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `expo start --clear`
- Rebuild native folders: `expo prebuild --clean`

## 📄 License

Private project - All rights reserved

## 🤝 Contributing

This is a private project. Contact the project owner for contribution guidelines.

---

**Note:** This app is configured for iOS and Android only. Web support has been intentionally removed to optimize for mobile platforms and native features like AdMob.

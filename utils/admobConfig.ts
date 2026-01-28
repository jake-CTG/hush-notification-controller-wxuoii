
import { Platform } from 'react-native';

// AdMob App IDs and Ad Unit IDs
export const ADMOB_CONFIG = {
  android: {
    appId: 'ca-app-pub-4671174985752856~1065694605',
    interstitialAdUnitId: 'ca-app-pub-4671174985752856/2792282197',
  },
  ios: {
    appId: 'ca-app-pub-4671174985752856~5400525438',
    interstitialAdUnitId: 'ca-app-pub-4671174985752856/6539955514',
  },
};

// Get the appropriate ad unit ID for the current platform
export const getInterstitialAdUnitId = (): string => {
  return Platform.OS === 'ios'
    ? ADMOB_CONFIG.ios.interstitialAdUnitId
    : ADMOB_CONFIG.android.interstitialAdUnitId;
};

// Get the appropriate app ID for the current platform
export const getAdMobAppId = (): string => {
  return Platform.OS === 'ios'
    ? ADMOB_CONFIG.ios.appId
    : ADMOB_CONFIG.android.appId;
};

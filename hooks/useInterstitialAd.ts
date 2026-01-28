
// This file serves as the entry point and will automatically resolve to:
// - useInterstitialAd.native.ts on iOS/Android
// - useInterstitialAd.web.ts on web

// Default to web version to prevent native module imports on web
export { useInterstitialAd } from './useInterstitialAd.web';

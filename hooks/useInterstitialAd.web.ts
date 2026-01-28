
import { useState, useCallback } from 'react';

// Web fallback - AdMob is not supported on web
export function useInterstitialAd() {
  const [isAdLoaded] = useState(false);
  const [isAdLoading] = useState(false);

  // Function to show the ad (no-op on web)
  const showAd = useCallback(async (): Promise<boolean> => {
    console.log('AdMob is not supported on web - skipping ad');
    return false;
  }, []);

  return {
    showAd,
    isAdLoaded,
    isAdLoading,
  };
}

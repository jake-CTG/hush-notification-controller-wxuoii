
import { useEffect, useState, useCallback } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { getInterstitialAdUnitId } from '@/utils/admobConfig';

export function useInterstitialAd() {
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);

  // Create and load the interstitial ad
  useEffect(() => {
    console.log('Initializing interstitial ad');
    
    // Use test ad unit ID in development, real ID in production
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : getInterstitialAdUnitId();
    
    const ad = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    // Set up event listeners
    const loadedListener = ad.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded successfully');
      setIsAdLoaded(true);
      setIsAdLoading(false);
    });

    const errorListener = ad.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Interstitial ad failed to load:', error);
      setIsAdLoaded(false);
      setIsAdLoading(false);
    });

    const closedListener = ad.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial ad closed by user');
      setIsAdLoaded(false);
      // Preload the next ad
      ad.load();
      setIsAdLoading(true);
    });

    setInterstitialAd(ad);

    // Load the ad
    console.log('Loading interstitial ad');
    ad.load();
    setIsAdLoading(true);

    // Cleanup
    return () => {
      console.log('Cleaning up interstitial ad listeners');
      loadedListener();
      errorListener();
      closedListener();
    };
  }, []);

  // Function to show the ad
  const showAd = useCallback(async (): Promise<boolean> => {
    if (!interstitialAd) {
      console.log('Interstitial ad not initialized');
      return false;
    }

    if (!isAdLoaded) {
      console.log('Interstitial ad not loaded yet');
      return false;
    }

    try {
      console.log('Showing interstitial ad');
      await interstitialAd.show();
      return true;
    } catch (error) {
      console.log('Error showing interstitial ad:', error);
      return false;
    }
  }, [interstitialAd, isAdLoaded]);

  return {
    showAd,
    isAdLoaded,
    isAdLoading,
  };
}

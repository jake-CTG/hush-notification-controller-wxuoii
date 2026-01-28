
import mobileAds from 'react-native-google-mobile-ads';

export async function initializeAdMob() {
  console.log('Initializing Google Mobile Ads (native)');
  try {
    const adapterStatuses = await mobileAds().initialize();
    console.log('Google Mobile Ads initialized:', adapterStatuses);
    return true;
  } catch (error) {
    console.log('Error initializing Google Mobile Ads:', error);
    return false;
  }
}

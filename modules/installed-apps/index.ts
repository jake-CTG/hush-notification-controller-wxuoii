
import { NativeModules, Platform } from 'react-native';

export interface InstalledApp {
  packageName: string;
  appName: string;
  icon: string; // base64 encoded icon
  notificationsEnabled: boolean;
}

export interface AppNotificationChannel {
  id: string;
  name: string;
  description: string;
  importance: number;
  enabled: boolean;
}

const LINKING_ERROR =
  `The package 'installed-apps-module' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InstalledAppsModule = NativeModules.InstalledAppsModule
  ? NativeModules.InstalledAppsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function getInstalledApps(): Promise<InstalledApp[]> {
  if (Platform.OS !== 'android') {
    console.warn('getInstalledApps is only supported on Android');
    return [];
  }
  
  try {
    const apps = await InstalledAppsModule.getInstalledApps();
    console.log('Retrieved installed apps:', apps.length);
    return apps;
  } catch (error) {
    console.error('Error getting installed apps:', error);
    return [];
  }
}

export async function getAppNotificationChannels(packageName: string): Promise<AppNotificationChannel[]> {
  if (Platform.OS !== 'android') {
    console.warn('getAppNotificationChannels is only supported on Android');
    return [];
  }
  
  try {
    const channels = await InstalledAppsModule.getAppNotificationChannels(packageName);
    console.log('Retrieved notification channels for', packageName, ':', channels.length);
    return channels;
  } catch (error) {
    console.error('Error getting notification channels:', error);
    return [];
  }
}

export async function openAppNotificationSettings(packageName: string): Promise<void> {
  if (Platform.OS !== 'android') {
    console.warn('openAppNotificationSettings is only supported on Android');
    return;
  }
  
  try {
    await InstalledAppsModule.openAppNotificationSettings(packageName);
    console.log('Opened notification settings for', packageName);
  } catch (error) {
    console.error('Error opening notification settings:', error);
  }
}


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { openAppNotificationSettings, getAppNotificationChannels, AppNotificationChannel } from '@/modules/installed-apps';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: '1',
    title: 'Allow Notifications',
    description: 'Enable all notifications from this app',
    enabled: true,
  },
  {
    id: '2',
    title: 'Sounds',
    description: 'Play sound when notifications arrive',
    enabled: true,
  },
  {
    id: '3',
    title: 'Badges',
    description: 'Show badge on app icon',
    enabled: true,
  },
  {
    id: '4',
    title: 'Lock Screen',
    description: 'Show notifications on lock screen',
    enabled: true,
  },
  {
    id: '5',
    title: 'Notification Center',
    description: 'Show in notification center',
    enabled: true,
  },
  {
    id: '6',
    title: 'Banners',
    description: 'Show banner notifications',
    enabled: false,
  },
  {
    id: '7',
    title: 'Alerts',
    description: 'Show alert-style notifications',
    enabled: true,
  },
  {
    id: '8',
    title: 'Previews',
    description: 'Show notification previews',
    enabled: true,
  },
  {
    id: '9',
    title: 'Critical Alerts',
    description: 'Allow critical alerts that bypass Do Not Disturb',
    enabled: false,
  },
  {
    id: '10',
    title: 'Time Sensitive',
    description: 'Allow time-sensitive notifications',
    enabled: true,
  },
  {
    id: '11',
    title: 'Grouping',
    description: 'Group notifications from this app',
    enabled: true,
  },
  {
    id: '12',
    title: 'Direct Messages',
    description: 'Notifications for direct messages',
    enabled: true,
  },
  {
    id: '13',
    title: 'Mentions',
    description: 'Notifications when you are mentioned',
    enabled: true,
  },
  {
    id: '14',
    title: 'Comments',
    description: 'Notifications for comments',
    enabled: false,
  },
  {
    id: '15',
    title: 'Likes',
    description: 'Notifications for likes',
    enabled: false,
  },
];

export default function AppDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useAppTheme();
  
  const appName = params.appName as string;
  const appIcon = params.appIcon as string;
  const packageName = params.packageName as string;
  
  const [settings, setSettings] = useState<NotificationSetting[]>(mockNotificationSettings);
  const [hasRealSettings, setHasRealSettings] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, [packageName]);

  const loadNotificationSettings = async () => {
    if (!packageName || Platform.OS !== 'android') {
      console.log('Cannot load real notification settings - using mock data');
      return;
    }

    try {
      console.log('Attempting to load notification channels for', packageName);
      const channels = await getAppNotificationChannels(packageName);
      
      if (channels && channels.length > 0) {
        console.log('Loaded', channels.length, 'notification channels');
        
        const formattedSettings: NotificationSetting[] = channels.map((channel: AppNotificationChannel) => ({
          id: channel.id,
          title: channel.name,
          description: channel.description || 'Notification channel',
          enabled: channel.enabled,
        }));
        
        setSettings(formattedSettings);
        setHasRealSettings(true);
      } else {
        console.log('No notification channels found, showing system settings option');
      }
    } catch (error) {
      console.error('Error loading notification channels:', error);
    }
  };

  const toggleSetting = (settingId: string, value: boolean) => {
    console.log('User toggled setting:', settingId, 'to:', value);
    
    if (hasRealSettings && packageName && Platform.OS === 'android') {
      console.log('Opening system notification settings for', packageName);
      openAppNotificationSettings(packageName);
    } else {
      setSettings(settings.map(setting =>
        setting.id === settingId ? { ...setting, enabled: value } : setting
      ));
    }
  };

  const handleClose = () => {
    console.log('User tapped close button');
    router.back();
  };

  const openSystemSettings = () => {
    console.log('User requested to open system notification settings');
    
    if (packageName && Platform.OS === 'android') {
      openAppNotificationSettings(packageName);
    } else {
      Alert.alert(
        'System Settings',
        'Please open your device Settings app to manage notification settings for this app.',
        [{ text: 'OK' }]
      );
    }
  };

  const isBase64Icon = (icon: string) => {
    return icon && icon.length > 100 && !icon.includes('://');
  };

  const hasBase64Icon = isBase64Icon(appIcon);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <View style={styles.headerLeft}>
            {hasBase64Icon ? (
              <Image 
                source={{ uri: `data:image/png;base64,${appIcon}` }}
                style={styles.appIconImage}
              />
            ) : (
              <Text style={styles.appIcon}>{appIcon}</Text>
            )}
            <Text style={[styles.appName, { color: colors.text }]}>{appName}</Text>
          </View>
          
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <IconSymbol
              ios_icon_name="xmark"
              android_material_icon_name="close"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        {packageName && Platform.OS === 'android' && (
          <TouchableOpacity 
            style={[styles.systemSettingsButton, { backgroundColor: colors.primary }]}
            onPress={openSystemSettings}
          >
            <IconSymbol
              ios_icon_name="gear"
              android_material_icon_name="settings"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.systemSettingsText}>
              Open System Notification Settings
            </Text>
          </TouchableOpacity>
        )}

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.infoBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol
              ios_icon_name="info.circle"
              android_material_icon_name="info"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {Platform.OS === 'android' 
                ? 'Tap the button above to manage this app\'s notification settings in your device settings. Android restricts apps from directly modifying other apps\' notification settings for security reasons.'
                : 'iOS does not allow apps to access or modify notification settings for other apps. Please use the Settings app to manage notifications.'}
            </Text>
          </View>

          {settings.map((setting) => {
            const settingEnabled = setting.enabled;
            return (
              <View
                key={setting.id}
                style={[styles.settingItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
              >
                <View style={styles.settingLeft}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {setting.title}
                  </Text>
                  <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                    {setting.description}
                  </Text>
                </View>
                
                <Switch
                  value={settingEnabled}
                  onValueChange={(value) => toggleSetting(setting.id, value)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
                  ios_backgroundColor={colors.border}
                  disabled={packageName && Platform.OS === 'android'}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  appIconImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  systemSettingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  systemSettingsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLeft: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});

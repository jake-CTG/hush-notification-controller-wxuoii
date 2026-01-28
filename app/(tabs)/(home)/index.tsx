
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { HushLogo } from '@/components/HushLogo';

interface App {
  id: string;
  name: string;
  icon: string;
  notificationsEnabled: boolean;
}

const mockApps: App[] = [
  { id: '1', name: 'Calendar', icon: '📅', notificationsEnabled: true },
  { id: '2', name: 'Camera', icon: '📷', notificationsEnabled: true },
  { id: '3', name: 'Clock', icon: '⏰', notificationsEnabled: false },
  { id: '4', name: 'Contacts', icon: '👥', notificationsEnabled: true },
  { id: '5', name: 'Email', icon: '✉️', notificationsEnabled: true },
  { id: '6', name: 'Facebook', icon: '📘', notificationsEnabled: false },
  { id: '7', name: 'Instagram', icon: '📸', notificationsEnabled: true },
  { id: '8', name: 'Maps', icon: '🗺️', notificationsEnabled: true },
  { id: '9', name: 'Messages', icon: '💬', notificationsEnabled: true },
  { id: '10', name: 'Music', icon: '🎵', notificationsEnabled: false },
  { id: '11', name: 'News', icon: '📰', notificationsEnabled: true },
  { id: '12', name: 'Notes', icon: '📝', notificationsEnabled: true },
  { id: '13', name: 'Phone', icon: '📞', notificationsEnabled: true },
  { id: '14', name: 'Photos', icon: '🖼️', notificationsEnabled: true },
  { id: '15', name: 'Settings', icon: '⚙️', notificationsEnabled: false },
  { id: '16', name: 'Slack', icon: '💼', notificationsEnabled: true },
  { id: '17', name: 'TikTok', icon: '🎬', notificationsEnabled: true },
  { id: '18', name: 'Twitter', icon: '🐦', notificationsEnabled: false },
  { id: '19', name: 'Weather', icon: '🌤️', notificationsEnabled: true },
  { id: '20', name: 'WhatsApp', icon: '💚', notificationsEnabled: true },
  { id: '21', name: 'YouTube', icon: '📺', notificationsEnabled: false },
].sort((a, b) => a.name.localeCompare(b.name));

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark, themeMode, setThemeMode } = useAppTheme();
  const [apps, setApps] = useState<App[]>(mockApps);
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(true);

  const toggleAllNotifications = (value: boolean) => {
    console.log('User toggled all notifications:', value);
    setAllNotificationsEnabled(value);
    setApps(apps.map(app => ({ ...app, notificationsEnabled: value })));
  };

  const toggleAppNotification = (appId: string, value: boolean) => {
    console.log('User toggled notification for app:', appId, 'to:', value);
    setApps(apps.map(app => 
      app.id === appId ? { ...app, notificationsEnabled: value } : app
    ));
  };

  const navigateToAppDetail = (app: App) => {
    console.log('User tapped on app:', app.name);
    router.push({
      pathname: '/app-detail',
      params: { appId: app.id, appName: app.name, appIcon: app.icon },
    });
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    console.log('User toggled theme to:', newMode);
    setThemeMode(newMode);
  };

  const bellIconColor = allNotificationsEnabled ? colors.primary : colors.textSecondary;
  const bellIconName = allNotificationsEnabled ? 'notifications' : 'notifications-off';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <HushLogo size="small" color={colors.primary} />
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>HUSH</Text>
            <Text style={[styles.headerSubtitle, { color: colors.primary }]}>
              Notification Controller
            </Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <IconSymbol
            ios_icon_name={isDark ? 'sun.max.fill' : 'moon.fill'}
            android_material_icon_name={isDark ? 'wb-sunny' : 'nightlight-round'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* All Notifications Toggle */}
      <View style={[styles.allToggleContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.allToggleLeft}>
          <IconSymbol
            ios_icon_name={allNotificationsEnabled ? 'bell.fill' : 'bell.slash.fill'}
            android_material_icon_name={bellIconName}
            size={24}
            color={bellIconColor}
          />
          <Text style={[styles.allToggleText, { color: colors.text }]}>
            All Notifications
          </Text>
        </View>
        <View style={[styles.customSwitch, { backgroundColor: allNotificationsEnabled ? colors.primary : colors.border }]}>
          <TouchableOpacity
            style={[
              styles.customSwitchThumb,
              allNotificationsEnabled ? styles.customSwitchThumbActive : styles.customSwitchThumbInactive
            ]}
            onPress={() => toggleAllNotifications(!allNotificationsEnabled)}
            activeOpacity={0.8}
          />
        </View>
      </View>

      {/* App List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {apps.map((app) => {
          const appEnabled = app.notificationsEnabled;
          return (
            <TouchableOpacity
              key={app.id}
              style={[styles.appItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
              onPress={() => navigateToAppDetail(app)}
              activeOpacity={0.7}
            >
              <View style={styles.appLeft}>
                <Text style={styles.appIcon}>{app.icon}</Text>
                <Text style={[styles.appName, { color: colors.text }]}>{app.name}</Text>
              </View>
              
              <View style={[styles.customSwitch, { backgroundColor: appEnabled ? colors.primary : colors.border }]}>
                <TouchableOpacity
                  style={[
                    styles.customSwitchThumb,
                    appEnabled ? styles.customSwitchThumbActive : styles.customSwitchThumbInactive
                  ]}
                  onPress={() => toggleAppNotification(app.id, !appEnabled)}
                  activeOpacity={0.8}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
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
  headerTextContainer: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  themeToggle: {
    padding: 8,
  },
  allToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  allToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  allToggleText: {
    fontSize: 17,
    fontWeight: '600',
  },
  customSwitch: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    justifyContent: 'center',
    padding: 2,
  },
  customSwitchThumb: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  customSwitchThumbActive: {
    alignSelf: 'flex-end',
  },
  customSwitchThumbInactive: {
    alignSelf: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  appLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

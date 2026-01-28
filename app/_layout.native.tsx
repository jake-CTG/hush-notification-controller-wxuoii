
import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import mobileAds from 'react-native-google-mobile-ads';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "splash",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Initialize Google Mobile Ads (native only)
    console.log('RootLayout: Initializing Google Mobile Ads');
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Google Mobile Ads initialized:', adapterStatuses);
      })
      .catch(error => {
        console.log('Error initializing Google Mobile Ads:', error);
      });
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log('RootLayout: Fonts loaded, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(168, 85, 247)",
      background: "rgb(245, 245, 247)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(229, 229, 234)",
      notification: "rgb(236, 72, 153)",
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(168, 85, 247)",
      background: "rgb(0, 0, 0)",
      card: "rgb(28, 28, 30)",
      text: "rgb(255, 255, 255)",
      border: "rgb(56, 56, 58)",
      notification: "rgb(236, 72, 153)",
    },
  };

  return (
    <>
      <StatusBar style="auto" animated />
      <ThemeProvider>
        <NavigationThemeProvider
          value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
        >
          <WidgetProvider>
            <GestureHandlerRootView>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'none',
                }}
              >
                <Stack.Screen name="splash" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="app-detail" />
              </Stack>
              <SystemBars style={"auto"} />
            </GestureHandlerRootView>
          </WidgetProvider>
        </NavigationThemeProvider>
      </ThemeProvider>
    </>
  );
}

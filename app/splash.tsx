
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('SplashScreen: Starting animation sequence');
    
    // Wait 3 seconds, then animate
    const timer = setTimeout(() => {
      console.log('SplashScreen: Starting shrink animation to top left');
      
      Animated.parallel([
        // Shrink the logo
        Animated.timing(scaleAnim, {
          toValue: 0.2,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        // Move to top left (negative values move left and up)
        Animated.timing(translateXAnim, {
          toValue: -140,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -320,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        // Fade out background
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]).start(() => {
        console.log('SplashScreen: Animation complete, navigating to home');
        router.replace('/(tabs)/(home)/');
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [scaleAnim, translateXAnim, translateYAnim, opacityAnim, router]);

  const logoSource = require('@/assets/images/de3bec55-3937-4228-bfc0-b991dbb3ca3e.png');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={{ opacity: opacityAnim }}>
        <View style={[styles.gradientBackground, { backgroundColor: colors.primary }]} />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateX: translateXAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <Image
          source={resolveImageSource(logoSource)}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    opacity: 0.1,
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
});

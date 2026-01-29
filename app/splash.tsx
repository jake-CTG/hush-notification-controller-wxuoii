
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';
import { HushLogo } from '@/components/HushLogo';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const positionAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('SplashScreen: Starting animation sequence');
    
    // Wait 3 seconds, then animate
    const timer = setTimeout(() => {
      console.log('SplashScreen: Starting shrink animation');
      
      Animated.parallel([
        // Shrink the logo
        Animated.timing(scaleAnim, {
          toValue: 0.15,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        // Move to top left
        Animated.timing(positionAnim, {
          toValue: 1,
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
  }, [scaleAnim, positionAnim, opacityAnim, router]);

  const translateX = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const translateY = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -280],
  });

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
              { translateX },
              { translateY },
            ],
          },
        ]}
      >
        <HushLogo size="large" color={colors.primary} />
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
    width: 300,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

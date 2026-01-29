
import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface HushLogoProps {
  size?: 'small' | 'large';
  color?: string;
}

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export function HushLogo({ size = 'large', color }: HushLogoProps) {
  const isSmall = size === 'small';
  const logoSource = require('@/assets/images/final_quest_240x240.png');
  
  return (
    <View style={[
      styles.container,
      isSmall ? styles.containerSmall : styles.containerLarge
    ]}>
      <Image
        source={resolveImageSource(logoSource)}
        style={[
          styles.image,
          isSmall ? styles.imageSmall : styles.imageLarge
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSmall: {
    width: 40,
    height: 40,
  },
  containerLarge: {
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageSmall: {
    width: 40,
    height: 40,
  },
  imageLarge: {
    width: 200,
    height: 200,
  },
});

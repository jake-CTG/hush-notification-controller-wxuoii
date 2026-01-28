
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HushLogoProps {
  size?: 'small' | 'large';
  color?: string;
}

export function HushLogo({ size = 'large', color = '#A855F7' }: HushLogoProps) {
  const isSmall = size === 'small';
  
  return (
    <View style={[
      styles.container,
      isSmall ? styles.containerSmall : styles.containerLarge,
      { backgroundColor: color }
    ]}>
      <Text style={[
        styles.text,
        isSmall ? styles.textSmall : styles.textLarge
      ]}>
        HUSH
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  containerSmall: {
    width: 40,
    height: 80,
  },
  containerLarge: {
    width: 300,
    height: 600,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 2,
  },
  textSmall: {
    fontSize: 12,
    transform: [{ rotate: '90deg' }],
  },
  textLarge: {
    fontSize: 48,
    transform: [{ rotate: '90deg' }],
  },
});

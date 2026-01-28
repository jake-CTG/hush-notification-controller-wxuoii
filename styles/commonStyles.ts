
import { StyleSheet } from 'react-native';

// HUSH app color scheme - purple/pink theme
export const colors = {
  light: {
    background: '#F5F5F7',
    card: '#FFFFFF',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    primary: '#A855F7',
    secondary: '#D946EF',
    accent: '#EC4899',
    border: '#E5E5EA',
    toggle: '#34C759',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    primary: '#A855F7',
    secondary: '#D946EF',
    accent: '#EC4899',
    border: '#38383A',
    toggle: '#32D74B',
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

import { useColorScheme } from 'react-native';

export type Theme = {
  background: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  placeholder: string;
  primary: string;
  primaryDisabled: string;
  onPrimary: string;
  assistantBubble: string;
  avatar: string;
  avatarDot: string;
  codeBackground: string;
};

export const lightTheme: Theme = {
  background: '#ffffff',
  border: '#d9dce1',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#8a8f98',
  placeholder: '#8a8f98',
  primary: '#4f46e5',
  primaryDisabled: '#c7c9f0',
  onPrimary: '#ffffff',
  assistantBubble: '#eceefb',
  avatar: '#e5e7eb',
  avatarDot: '#9ca3af',
  codeBackground: '#dfe2f3',
};

export const darkTheme: Theme = {
  background: '#0f1115',
  border: '#2a2e37',
  textPrimary: '#f3f4f6',
  textSecondary: '#9ca3af',
  textMuted: '#7b818c',
  placeholder: '#7b818c',
  primary: '#6366f1',
  primaryDisabled: '#2f3160',
  onPrimary: '#ffffff',
  assistantBubble: '#1e2230',
  avatar: '#2a2e37',
  avatarDot: '#6b7280',
  codeBackground: '#131722',
};

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? darkTheme : lightTheme;
}

// Names match the font files' PostScript names so one value works on iOS and Android.
export const fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;

import { Platform, StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 8,
      backgroundColor: theme.background,
    },
    pill: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 24,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    attachIcon: {
      width: 28,
      height: 28,
      marginBottom: 2,
    },
    input: {
      flex: 1,
      maxHeight: 120,
      fontFamily: fonts.regular,
      fontSize: 15,
      paddingVertical: Platform.OS === 'ios' ? 6 : 4,
      color: theme.textPrimary,
    },
    sendButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: theme.primaryDisabled,
    },
    sendIcon: {
      width: 18,
      height: 18,
    },
  });

import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    card: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.background,
      borderRadius: 20,
      padding: 20,
      gap: 8,
    },
    title: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
      color: theme.textPrimary,
    },
    message: {
      fontFamily: fonts.regular,
      fontSize: 15,
      lineHeight: 20,
      color: theme.textSecondary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 12,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
    },
    buttonPrimary: {
      backgroundColor: theme.primary,
    },
    buttonPressed: {
      opacity: 0.7,
    },
    buttonLabel: {
      fontFamily: fonts.semiBold,
      fontSize: 15,
      color: theme.textSecondary,
    },
    buttonLabelPrimary: {
      color: theme.onPrimary,
    },
  });

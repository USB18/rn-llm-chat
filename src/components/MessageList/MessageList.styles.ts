import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
      padding: 16,
      gap: 16,
    },
    typing: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: theme.textSecondary,
      paddingHorizontal: 16,
      paddingBottom: 30,
    },
    empty: {
      fontFamily: fonts.regular,
      textAlign: 'center',
      color: theme.textSecondary,
      marginTop: 48,
    },
  });

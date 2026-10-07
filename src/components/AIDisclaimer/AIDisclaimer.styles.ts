import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontFamily: fonts.regular,
      fontSize: 11,
      textAlign: 'center',
      color: theme.textMuted,
      paddingHorizontal: 16,
      paddingTop: 6,
    },
  });

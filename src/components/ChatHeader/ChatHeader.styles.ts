import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.border,
    },
    side: {
      width: 40,
    },
    sideRight: {
      alignItems: 'flex-end',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: fonts.semiBold,
      color: theme.textPrimary,
    },
    icon: {
      fontSize: 22,
      color: theme.textPrimary,
    },
  });

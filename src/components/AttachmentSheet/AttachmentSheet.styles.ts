import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheet: {
      backgroundColor: theme.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 16,
      paddingTop: 8,
      gap: 4,
    },
    handle: {
      alignSelf: 'center',
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.border,
      marginBottom: 12,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 14,
      paddingHorizontal: 8,
      borderRadius: 12,
    },
    optionPressed: {
      backgroundColor: theme.assistantBubble,
    },
    optionIconWrap: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.assistantBubble,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionIcon: {
      width: 24,
      height: 24,
    },
    optionLabel: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: theme.textPrimary,
    },
  });

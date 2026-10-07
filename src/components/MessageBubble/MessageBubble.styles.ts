import { StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    rowUser: {
      justifyContent: 'flex-end',
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.avatar,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.avatarDot,
    },
    column: {
      maxWidth: '82%',
    },
    bubble: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
    },
    bubbleUser: {
      backgroundColor: theme.primary,
      borderTopRightRadius: 6,
    },
    bubbleAssistant: {
      backgroundColor: theme.assistantBubble,
      borderTopLeftRadius: 6,
    },
    text: {
      fontFamily: fonts.medium,
      fontSize: 15,
      lineHeight: 20,
      color: theme.textPrimary,
    },
    textUser: {
      color: theme.onPrimary,
    },
    time: {
      fontFamily: fonts.regular,
      fontSize: 11,
      color: theme.textMuted,
      marginTop: 4,
      marginLeft: 4,
    },
    timeUser: {
      textAlign: 'right',
      marginRight: 4,
    },
  });

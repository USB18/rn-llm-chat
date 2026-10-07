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
    attachments: {
      gap: 8,
      marginBottom: 4,
    },
    attachmentImage: {
      width: 220,
      height: 220,
      borderRadius: 12,
      backgroundColor: theme.avatar,
    },
    videoTile: {
      width: 220,
      height: 140,
      borderRadius: 12,
      backgroundColor: theme.codeBackground,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    videoPlayIcon: {
      width: 36,
      height: 36,
    },
    videoLabel: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: theme.textSecondary,
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

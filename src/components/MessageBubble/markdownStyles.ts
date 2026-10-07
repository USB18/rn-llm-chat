import { Platform, StyleSheet } from 'react-native';
import { fonts, Theme } from '../../theme';

const MONO = Platform.select({ ios: 'Menlo', default: 'monospace' });

// Styles for react-native-markdown-display, keyed by markdown element.
// fontWeight is reset because each Inter weight is its own font family here.
export const createMarkdownStyles = (theme: Theme) =>
  StyleSheet.create({
    body: {
      fontFamily: fonts.medium,
      fontSize: 15,
      lineHeight: 22,
      color: theme.textPrimary,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 8,
    },
    heading1: {
      fontFamily: fonts.bold,
      fontWeight: 'normal',
      fontSize: 22,
      marginTop: 8,
      marginBottom: 6,
    },
    heading2: {
      fontFamily: fonts.bold,
      fontWeight: 'normal',
      fontSize: 19,
      marginTop: 8,
      marginBottom: 6,
    },
    heading3: {
      fontFamily: fonts.semiBold,
      fontWeight: 'normal',
      fontSize: 17,
      marginTop: 6,
      marginBottom: 4,
    },
    heading4: {
      fontFamily: fonts.semiBold,
      fontWeight: 'normal',
      fontSize: 15,
    },
    strong: {
      fontFamily: fonts.bold,
      fontWeight: 'normal',
    },
    em: {
      fontStyle: 'italic',
    },
    s: {
      textDecorationLine: 'line-through',
    },
    hr: {
      backgroundColor: theme.border,
      height: 1,
      marginVertical: 12,
    },
    blockquote: {
      backgroundColor: 'transparent',
      borderLeftWidth: 3,
      borderColor: theme.primary,
      marginLeft: 0,
      paddingLeft: 10,
    },
    bullet_list_icon: {
      marginLeft: 0,
      marginRight: 8,
    },
    ordered_list_icon: {
      marginLeft: 0,
      marginRight: 8,
    },
    code_inline: {
      fontFamily: MONO,
      fontSize: 13,
      backgroundColor: theme.codeBackground,
      color: theme.textPrimary,
      borderWidth: 0,
      borderRadius: 4,
      paddingHorizontal: 4,
      padding: 0,
    },
    code_block: {
      fontFamily: MONO,
      fontSize: 13,
      lineHeight: 19,
      backgroundColor: theme.codeBackground,
      color: theme.textPrimary,
      borderWidth: 0,
      borderRadius: 10,
      padding: 12,
      marginVertical: 6,
    },
    fence: {
      fontFamily: MONO,
      fontSize: 13,
      lineHeight: 19,
      backgroundColor: theme.codeBackground,
      color: theme.textPrimary,
      borderWidth: 0,
      borderRadius: 10,
      padding: 12,
      marginVertical: 6,
    },
    link: {
      color: theme.primary,
      textDecorationLine: 'underline',
    },
    table: {
      borderColor: theme.border,
    },
    tr: {
      borderColor: theme.border,
    },
  });

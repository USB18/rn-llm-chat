import { useMemo } from 'react';
import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useTheme } from '../../theme';
import { Message } from '../../types';
import { createMarkdownStyles } from './markdownStyles';
import { createStyles } from './MessageBubble.styles';

type Props = {
  message: Message;
};

function MessageBubble({ message }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const markdownStyles = useMemo(() => createMarkdownStyles(theme), [theme]);
  const isUser = message.role === 'user';
  // Only real model replies are Markdown; your own text and error notices stay plain.
  const renderMarkdown = !isUser && !message.isError;

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      {!isUser && (
        <View style={styles.avatar}>
          <View style={styles.avatarDot} />
        </View>
      )}
      <View style={styles.column}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAssistant,
          ]}
        >
          {renderMarkdown ? (
            <Markdown style={markdownStyles}>{message.text}</Markdown>
          ) : (
            <Text style={[styles.text, isUser && styles.textUser]}>
              {message.text}
            </Text>
          )}
        </View>
        <Text style={[styles.time, isUser && styles.timeUser]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

export default MessageBubble;

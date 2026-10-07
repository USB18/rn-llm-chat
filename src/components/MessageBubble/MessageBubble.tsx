import { useMemo } from 'react';
import { Image, Text, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { icons } from '../../assets/icons';
import { useTheme } from '../../theme';
import { Message } from '../../types';
import { createMarkdownStyles } from './markdownStyles';
import { createStyles } from './MessageBubble.styles';

type Props = {
  message: Message;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function MessageBubble({ message }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const markdownStyles = useMemo(() => createMarkdownStyles(theme), [theme]);
  const isUser = message.role === 'user';
  const hasAttachments = !!message.attachments?.length;
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
          {hasAttachments && (
            <View style={styles.attachments}>
              {message.attachments?.map(attachment =>
                attachment.kind === 'image' ? (
                  <Image
                    key={attachment.id}
                    source={{ uri: attachment.uri }}
                    style={styles.attachmentImage}
                  />
                ) : (
                  <View key={attachment.id} style={styles.videoTile}>
                    <Image
                      source={icons.play}
                      style={[
                        styles.videoPlayIcon,
                        { tintColor: theme.textPrimary },
                      ]}
                    />
                    <Text style={styles.videoLabel}>
                      Video
                      {attachment.duration
                        ? ` · ${formatDuration(attachment.duration)}`
                        : ''}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}
          {renderMarkdown ? (
            <Markdown style={markdownStyles}>{message.text}</Markdown>
          ) : message.text ? (
            <Text style={[styles.text, isUser && styles.textUser]}>
              {message.text}
            </Text>
          ) : null}
        </View>
        <Text style={[styles.time, isUser && styles.timeUser]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

export default MessageBubble;

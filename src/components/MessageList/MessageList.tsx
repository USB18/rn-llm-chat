import { useEffect, useMemo, useRef } from 'react';
import { FlatList, Keyboard, Platform, Text } from 'react-native';
import { useTheme } from '../../theme';
import { Message } from '../../types';
import MessageBubble from '../MessageBubble';
import { createStyles } from './MessageList.styles';

type Props = {
  messages: Message[];
  typing?: boolean;
};

function MessageList({ messages, typing }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const listRef = useRef<FlatList<Message>>(null);

  // Keep the latest message visible when the keyboard shrinks the list.
  useEffect(() => {
    const event =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const sub = Keyboard.addListener(event, () =>
      listRef.current?.scrollToEnd({ animated: true }),
    );
    return () => sub.remove();
  }, []);

  // Your message (and the "Typing..." line) -> show the bottom.
  // A new reply -> show its first line, so long answers are read from the top.
  const count = messages.length;
  const lastRole = messages[count - 1]?.role;
  useEffect(() => {
    if (count === 0) {
      return;
    }
    const lastIndex = count - 1;
    const startOfReply = !typing && lastRole === 'assistant';
    // Wait a tick so the new row has been laid out.
    const timer = setTimeout(() => {
      if (startOfReply) {
        listRef.current?.scrollToIndex({
          index: lastIndex,
          viewPosition: 0,
          animated: true,
        });
      } else {
        listRef.current?.scrollToEnd({ animated: true });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [count, lastRole, typing]);

  return (
    <>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        onLayout={() => {
          if (typing) {
            listRef.current?.scrollToEnd({ animated: false });
          }
        }}
        // Rows have varying heights, so scrollToIndex can miss an unmeasured row:
        // jump close by estimate, then retry once it has been rendered.
        onScrollToIndexFailed={info => {
          listRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: false,
          });
          setTimeout(
            () =>
              listRef.current?.scrollToIndex({
                index: info.index,
                viewPosition: 0,
                animated: true,
              }),
            100,
          );
        }}
        ListFooterComponent={() =>
          typing ? <Text style={styles.typing}>Typing...</Text> : null
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Send a message to start the conversation.
          </Text>
        }
      />
    </>
  );
}

export default MessageList;

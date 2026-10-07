import { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AIDisclaimer from '../components/AIDisclaimer';
import ChatHeader from '../components/ChatHeader';
import Composer from '../components/Composer';
import MessageList from '../components/MessageList';
import { getErrorMessage, sendChat } from '../services/openai';
import { useTheme } from '../theme';
import { Message } from '../types';
import { createStyles } from './ChatScreen.styles';

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function ChatScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');

  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) {
      return;
    }
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: formatTime(new Date()),
    };
    setMessages(prev => [...prev, userMessage]);
    setDraft('');
    setSending(true);

    try {
      const reply = await sendChat(text, messages);
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: reply,
          time: formatTime(new Date()),
        },
      ]);
    } catch (e) {
      console.error('Error sending message:', e);
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: `Sorry, something went wrong: ${getErrorMessage(e)}`,
          time: formatTime(new Date()),
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  }, [draft, messages, sending]);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setDraft('');
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ChatHeader onNewChat={handleNewChat} />
      <MessageList messages={messages} typing={sending} />
      <KeyboardAvoidingView behavior="padding">
        <AIDisclaimer />
        <Composer value={draft} onChangeText={setDraft} onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

export default ChatScreen;

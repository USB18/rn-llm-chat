import { useMemo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons } from '../../assets/icons';
import { useTheme } from '../../theme';
import { createStyles } from './ChatHeader.styles';

type Props = {
  onNewChat: () => void;
};

function ChatHeader({ onNewChat }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.header}>
      <View style={styles.side} />
      <Text style={styles.title}>New chat</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start new chat"
        hitSlop={8}
        onPress={onNewChat}
        style={[styles.side, styles.sideRight]}
      >
        <Image
          source={icons.edit}
          style={[styles.icon, { tintColor: theme.textPrimary }]}
        />
      </Pressable>
    </View>
  );
}

export default ChatHeader;

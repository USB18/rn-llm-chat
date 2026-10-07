import { useMemo } from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../assets/icons';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import { useTheme } from '../../theme';
import { createStyles } from './Composer.styles';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onPressAttach: () => void;
};

function Composer({ value, onChangeText, onSend, onPressAttach }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const keyboardVisible = useKeyboardVisible();
  const canSend = value.trim().length > 0;
  // The keyboard already covers the home-indicator area, so skip the inset.
  const bottomPadding = keyboardVisible ? 12 : Math.max(insets.bottom, 12);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <View style={styles.pill}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          onPress={onPressAttach}
          hitSlop={8}
        >
          <Image
            source={icons.plus}
            style={[styles.attachIcon, { tintColor: theme.textSecondary }]}
          />
        </Pressable>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Message..."
          placeholderTextColor={theme.placeholder}
          style={styles.input}
          multiline
          returnKeyType="send"
          submitBehavior="submit"
          onSubmitEditing={onSend}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={onSend}
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
        >
          <Image
            source={icons.arrowUp}
            style={[styles.sendIcon, { tintColor: theme.onPrimary }]}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default Composer;

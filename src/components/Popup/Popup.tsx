import { useMemo } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { createStyles } from './Popup.styles';

export type PopupAction = {
  label: string;
  onPress?: () => void;
  /** Highlights the button as the main action. */
  primary?: boolean;
};

type Props = {
  visible: boolean;
  title: string;
  message?: string;
  actions: PopupAction[];
  onClose: () => void;
};

function Popup({ visible, title, message, actions, onClose }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Inner Pressable swallows taps so touching the card doesn't dismiss it. */}
        <Pressable style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.actions}>
            {actions.map(action => (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                onPress={() => {
                  onClose();
                  action.onPress?.();
                }}
                style={({ pressed }) => [
                  styles.button,
                  action.primary && styles.buttonPrimary,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.buttonLabel,
                    action.primary && styles.buttonLabelPrimary,
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default Popup;

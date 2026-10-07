import { useMemo } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../assets/icons';
import { useTheme } from '../../theme';
import { createStyles } from './AttachmentSheet.styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
  onRecordVideo: () => void;
};

function AttachmentSheet({
  visible,
  onClose,
  onPickFromGallery,
  onTakePhoto,
  onRecordVideo,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const options = [
    {
      icon: icons.gallery,
      label: 'Choose from gallery',
      onPress: onPickFromGallery,
    },
    { icon: icons.camera, label: 'Take a photo', onPress: onTakePhoto },
    { icon: icons.video, label: 'Record a video', onPress: onRecordVideo },
  ];

  // Close first so the picker/camera isn't launched over a still-visible modal (breaks on iOS).
  const handleSelect = (action: () => void) => {
    onClose();
    setTimeout(action, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityLabel="Close attachment options"
      >
        {/* Inner Pressable swallows taps so touching the sheet doesn't dismiss it. */}
        <Pressable
          style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}
        >
          <View style={styles.handle} />
          {options.map(option => (
            <Pressable
              key={option.label}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              onPress={() => handleSelect(option.onPress)}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={styles.optionIconWrap}>
                <Image
                  source={option.icon}
                  style={[styles.optionIcon, { tintColor: theme.textPrimary }]}
                />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default AttachmentSheet;

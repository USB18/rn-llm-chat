import { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import { usePopup } from '../components/Popup';
import { Attachment } from '../types';

type MediaPickerOptions = {
  onPicked: (attachments: Attachment[]) => void;
};

function toAttachment(asset: Asset, index: number): Attachment | null {
  if (!asset.uri) {
    return null;
  }
  return {
    id: `att-${Date.now()}-${index}`,
    kind: asset.type?.startsWith('video') ? 'video' : 'image',
    uri: asset.uri,
    fileName: asset.fileName,
    width: asset.width,
    height: asset.height,
    duration: asset.duration,
  };
}

const CAMERA_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  default: PERMISSIONS.ANDROID.CAMERA,
});
const MICROPHONE_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.MICROPHONE,
  default: PERMISSIONS.ANDROID.RECORD_AUDIO,
});

// Checks first so we only prompt when needed; returns false if the user said no
// (on iOS a denied prompt can't be shown again, so the alert sends them to Settings).
async function ensurePermissions(permissions: Permission[]) {
  for (const permission of permissions) {
    let status = await check(permission);
    if (status === RESULTS.DENIED) {
      status = await request(permission);
    }
    if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) {
      return false;
    }
  }
  return true;
}

function useMediaPicker({ onPicked }: MediaPickerOptions) {
  const { showPopup } = usePopup();

  const showPermissionDenied = useCallback(
    (what: string) => {
      showPopup({
        title: `${what} permission needed`,
        message: `Enable ${what.toLowerCase()} access in Settings to continue.`,
        actions: [
          { label: 'Cancel' },
          {
            label: 'Open Settings',
            primary: true,
            onPress: () => Linking.openSettings(),
          },
        ],
      });
    },
    [showPopup],
  );

  const handleResponse = useCallback(
    (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        if (response.errorCode === 'permission') {
          showPermissionDenied('Camera');
        } else {
          showPopup({
            title: 'Something went wrong',
            message: response.errorMessage,
          });
        }
        return;
      }
      const attachments = (response.assets ?? [])
        .map(toAttachment)
        .filter((a): a is Attachment => a !== null);
      if (attachments.length > 0) {
        onPicked(attachments);
      }
    },
    [onPicked, showPermissionDenied, showPopup],
  );

  const pickFromGallery = useCallback(() => {
    // The system photo picker needs no permission on Android or iOS 14+.
    const options: ImageLibraryOptions = {
      mediaType: 'mixed',
      selectionLimit: 10,
    };
    launchImageLibrary(options, handleResponse);
  }, [handleResponse]);

  const takePhoto = useCallback(async () => {
    const granted = await ensurePermissions([CAMERA_PERMISSION]);
    if (!granted) {
      showPermissionDenied('Camera');
      return;
    }
    const options: CameraOptions = { mediaType: 'photo', saveToPhotos: false };
    launchCamera(options, handleResponse);
  }, [handleResponse, showPermissionDenied]);

  const recordVideo = useCallback(async () => {
    const granted = await ensurePermissions([
      CAMERA_PERMISSION,
      MICROPHONE_PERMISSION,
    ]);
    if (!granted) {
      showPermissionDenied('Camera and microphone');
      return;
    }
    const options: CameraOptions = { mediaType: 'video', saveToPhotos: false };
    launchCamera(options, handleResponse);
  }, [handleResponse, showPermissionDenied]);

  return { pickFromGallery, takePhoto, recordVideo };
}

export default useMediaPicker;

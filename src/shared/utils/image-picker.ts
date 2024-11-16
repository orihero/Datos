import ImageCropPicker, {Image} from 'react-native-image-crop-picker';

export const pickImageFromDevice = async ({
  height,
  width,
  withCircleOverlay = false,
}: {
  height: number;
  width: number;
  withCircleOverlay?: boolean;
}): Promise<Image> => {
  const file = await ImageCropPicker.openPicker({
    width: width,
    height: height,
    multiple: false,
    cropperCircleOverlay: withCircleOverlay,
    mediaType: 'photo',
    compressImageQuality: 0.8,
    // cropperCancelText: 'Отменить',
    // cropperChooseText: 'Выбрать',
    cropping: true,
  });

  return file;
};

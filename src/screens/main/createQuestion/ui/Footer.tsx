import React from 'react';
import RN from 'components/RN';
import GalleryIcon from 'shared/assets/icons/Gallery';
import LinkIcon from 'shared/assets/icons/LinkIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {observer} from 'mobx-react-lite';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import VideoIcon from 'shared/assets/icons/VideoIcon';

export default observer(() => {
  const {onSelectNewPostMediaUrl} = useRootStore().post;

  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeExtra: true,
      },
      async response => {
        if (response.didCancel || response.errorMessage) {
          console.log('User cancelled image picker or there was an error');
        } else {
          const file = response.assets ? response.assets[0] : null;
          onSelectNewPostMediaUrl(file as never);
        }
      },
    );
  };

  return (
    <RN.View style={styles.container}>
      <RN.TouchableOpacity onPress={handlePickImage}>
        <GalleryIcon color={COLORS.textGray} />
      </RN.TouchableOpacity>
      <RN.TouchableOpacity>
        <VideoIcon color={COLORS.textGray} size={18} />
      </RN.TouchableOpacity>
    </RN.View>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  nextBtn: {
    width: '20%',
  },
});

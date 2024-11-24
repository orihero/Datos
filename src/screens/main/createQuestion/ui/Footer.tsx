import React from 'react';
import RN from 'components/RN';
import GalleryIcon from 'shared/assets/icons/Gallery';
import LinkIcon from 'shared/assets/icons/LinkIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {observer} from 'mobx-react-lite';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export default observer(() => {
  const {onSelectNewPostMediaUrls} = useRootStore().post;

  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        includeExtra: true,
      },
      async response => {
        if (response.didCancel || response.errorMessage) {
          console.log('User cancelled image picker or there was an error');
        } else {
          const file = response.assets ? response.assets : null;
          onSelectNewPostMediaUrls(file as never);
        }
      },
    );
  };

  return (
    <RN.View style={styles.container}>
      <RN.TouchableOpacity>
        <LinkIcon color={COLORS.textGray} />
      </RN.TouchableOpacity>
      <RN.TouchableOpacity onPress={handlePickImage}>
        <GalleryIcon color={COLORS.textGray} />
      </RN.TouchableOpacity>
    </RN.View>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(30),
    paddingVertical: normalizeHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  nextBtn: {
    width: '20%',
  },
});

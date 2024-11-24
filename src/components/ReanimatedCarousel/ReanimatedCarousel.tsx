import * as React from 'react';
import RN from '../RN';
import Carousel from 'react-native-reanimated-carousel';
import {normalizeHeight, normalizeWidth, SIZES} from 'shared/utils/dimensions';
import CrossRedCircleSmallIcon from 'shared/assets/icons/CrossRedCircleSmallIcon';
import {COLORS} from 'shared/constants/colors';
import {observer} from 'mobx-react-lite';
import {useRootStore} from 'shared/store/hooks/useRootStore';

const ReanimatedCarousel = ({data}: {data: string[]}) => {
  const {onRemoveNewPostMediaUrls} = useRootStore().post;
  const mediaData = data;

  const renderItem = React.useCallback(
    ({item}: {item: string}) => {
      return (
        <RN.View style={styles.itemContainer}>
          <RN.Image style={styles.image} source={{uri: item}} />
          <RN.TouchableOpacity
            style={styles.iconButton}
            onPress={() => onRemoveNewPostMediaUrls(item)}>
            <CrossRedCircleSmallIcon color={COLORS.lightGray} size={32} />
          </RN.TouchableOpacity>
        </RN.View>
      );
    },
    [onRemoveNewPostMediaUrls],
  );

  return (
    <RN.View style={styles.viewBox}>
      <Carousel
        width={SIZES.width}
        data={mediaData}
        enabled={mediaData.length > 1}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item}) => renderItem({item})}
      />
    </RN.View>
  );
};

export default observer(ReanimatedCarousel);

const styles = RN.StyleSheet.create({
  viewBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxHeight: SIZES.height / 2.5,
  },
  itemContainer: {
    width: '92%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconButton: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: normalizeHeight(5),
    right: normalizeWidth(10),
  },
});

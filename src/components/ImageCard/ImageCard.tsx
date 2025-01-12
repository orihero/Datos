import {Skeleton} from '@rneui/base';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import {ActivityIndicator, ImageStyle, StyleProp} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import {COLORS} from 'shared/constants/colors';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';

interface Props {
  uri?: string;
  height?: number;
  onPress?: () => void;
  imageStyles?: StyleProp<ImageStyle>;
  borderR?: number;
  isPreview?: boolean;
  isZoom?: boolean;
}

const ImageCard: FC<Props> = ({
  height = 200,
  uri,
  onPress,
  imageStyles,
  borderR,
  isPreview,
  isZoom,
}) => {
  const [loadEnd, setLoadEnd] = useState(false);

  const scale = useSharedValue(1);

  const resetScale = () => {
    scale.value = withSpring(1);
  };

  return isZoom ? (
    <RN.Pressable style={styles.root} onPress={onPress}>
      <ImageZoom
        uri={uri}
        minScale={1}
        maxScale={10}
        scale={scale}
        doubleTapScale={3}
        isSingleTapEnabled
        isDoubleTapEnabled
        onLoadEnd={() => setLoadEnd(true)}
        onInteractionStart={() => {
          console.log('onInteractionStart');
        }}
        onInteractionEnd={() => console.log('onInteractionEnd')}
        onPanStart={() => console.log('onPanStart')}
        onPanEnd={() => console.log('onPanEnd')}
        onPinchStart={() => console.log('onPinchStart')}
        onPinchEnd={() => {
          console.log('onPinchEnd');
          // resetScale();
        }}
        onSingleTap={() => console.log('onSingleTap')}
        onDoubleTap={zoomType => {
          console.log('onDoubleTap', zoomType);
        }}
        onProgrammaticZoom={zoomType => {
          console.log('onZoom', zoomType);
        }}
        style={styles.image}
        onResetAnimationEnd={(finished, values) => {
          console.log('onResetAnimationEnd', finished);
          console.log('lastScaleValue:', values?.SCALE.lastValue);
        }}
        resizeMode="cover"
      />
      {!loadEnd && (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={styles.loadingIndicator}
        />
      )}
    </RN.Pressable>
  ) : (
    <RN.Pressable
      style={[styles.container, {height: height}]}
      onPress={onPress}>
      <RN.Image
        onLoadEnd={() => setLoadEnd(true)}
        style={[
          styles.image,
          {height: height, borderRadius: borderR ? borderR : 15},
          imageStyles,
        ]}
        source={{uri: uri}}
        resizeMode="cover"
      />
      {!loadEnd && !isPreview && (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={'100%'}
          height={height}
          style={styles.skeleton}
        />
      )}
      {!loadEnd && isPreview && (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={styles.loadingIndicator}
        />
      )}
    </RN.Pressable>
  );
};

export default observer(ImageCard);

const styles = RN.StyleSheet.create({
  root: {
    flex: 0.8,
    position: 'relative', // Ensure the image stays within the parent layout
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Keep the Pressable positioned
    zIndex: 1, // Ensure default layers
  },
  image: {
    position: 'absolute', // Enable the image to overflow
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  skeleton: {
    position: 'absolute',
    borderRadius: 15,
    zIndex: 2,
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 2,
  },
});

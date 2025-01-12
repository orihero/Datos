import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import PauseIcon from 'shared/assets/icons/PauseIcon';
import PlayIcon from 'shared/assets/icons/PlayIcon';
import {COLORS} from 'shared/constants/colors';
import {HIT_SLOP} from 'shared/styles/globalStyles';
import {normalizeHeight} from 'shared/utils/dimensions';

interface Props {
  uri: string;
  height: number;
  onPressEnter?: () => void;
  borderRadius?: number;
}

const VideoContent: FC<Props> = ({uri, height, onPressEnter, borderRadius}) => {
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const onVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const onVideoEnd = () => {
    setIsPlaying(false);
    videoRef.current?.seek(0);
  };

  return (
    <RN.Pressable
      onPress={onPressEnter}
      style={[
        styles.videoContainer,
        {
          height: normalizeHeight(height),
          borderRadius: borderRadius ? borderRadius : 15,
        },
      ]}>
      {!isVideoLoaded && (
        <ActivityIndicator
          size="large"
          color={COLORS.blue}
          style={styles.loadingIndicator}
        />
      )}
      <Video
        source={{uri: uri}}
        ref={videoRef}
        onLoad={onVideoLoad}
        onEnd={onVideoEnd}
        style={[
          styles.backgroundVideo,
          {maxHeight: height, minHeight: height / 2},
        ]}
        paused={!isPlaying}
        resizeMode="cover"
      />
      {isVideoLoaded && (
        <RN.TouchableOpacity
          hitSlop={HIT_SLOP}
          style={[styles.playPauseButton, {opacity: isPlaying ? 0 : 1}]}
          onPress={handlePlayPause}>
          {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
        </RN.TouchableOpacity>
      )}
    </RN.Pressable>
  );
};

export default observer(VideoContent);

const styles = RN.StyleSheet.create({
  videoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    overflow: 'hidden',
  },
  backgroundVideo: {
    width: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 2,
  },
  playPauseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: COLORS.dargGray,
    zIndex: 3,
  },
  playPauseIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.blue,
  },
});

import {Skeleton} from '@rneui/base';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {FC, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {topicPngImage} from 'shared/assets/images';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight} from 'shared/utils/dimensions';

interface Props {
  uri?: string;
  size?: number;
  onPressFollowBtn?: () => void;
  isShowFollowBtn?: boolean;
  isUser: boolean;
}

const Avatar: FC<Props> = ({
  size = 50,
  uri,
  isShowFollowBtn,
  onPressFollowBtn,
  isUser,
}) => {
  const [loadEnd, setLoadEnd] = useState(false);

  return (
    <RN.View style={[styles.container, {width: size, height: size}]}>
      {uri ? (
        <RN.Image
          onLoadEnd={() => setLoadEnd(true)}
          style={[
            styles.avatar,
            {width: size, height: size, borderRadius: size / 2},
          ]}
          source={{uri: uri}}
          resizeMode="cover"
        />
      ) : (
        <RN.Image
          onLoadEnd={() => setLoadEnd(true)}
          style={[
            styles.avatar,
            {width: size, height: size, borderRadius: size / 2},
          ]}
          source={topicPngImage}
          resizeMode="cover"
        />
      )}
      {!loadEnd && (
        <Skeleton
          LinearGradientComponent={LinearGradient}
          circle
          animation="wave"
          width={size}
          height={size}
          style={styles.skeleton}
        />
      )}
      {isShowFollowBtn && isUser && (
        <RN.TouchableOpacity
          style={styles.followBtn}
          onPress={onPressFollowBtn}>
          <RN.Text
            children="Follow"
            color={COLORS.white}
            style={styles.follow}
          />
        </RN.TouchableOpacity>
      )}
      {isShowFollowBtn && !isUser && (
        <RN.TouchableOpacity
          style={styles.followBtn}
          onPress={onPressFollowBtn}>
          <RN.Text children="Join" color={COLORS.white} style={styles.follow} />
        </RN.TouchableOpacity>
      )}
    </RN.View>
  );
};

export default observer(Avatar);

const styles = RN.StyleSheet.create({
  container: {},
  avatar: {},
  followBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: COLORS.blue,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  follow: {
    fontSize: normalizeHeight(10),
  },
  skeleton: {
    position: 'absolute',
  },
});

import RN from 'components/RN';
import React, {FC} from 'react';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight} from 'shared/utils/dimensions';

interface Props {
  uri?: string;
  size?: number;
  onPressFollowBtn?: () => void;
  isShowFollowBtn?: boolean;
}

const Avatar: FC<Props> = ({size, uri, isShowFollowBtn, onPressFollowBtn}) => {
  return (
    <RN.View style={styles.container}>
      <RN.Image
        style={[styles.avatar, {width: size, height: size, borderRadius: size}]}
        source={{uri: uri}}
      />
      {isShowFollowBtn && (
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
    </RN.View>
  );
};

export default Avatar;

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
});

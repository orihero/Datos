import {Topic} from '@types';
import {Button} from 'components/Button';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React from 'react';
import UserIcon from 'shared/assets/icons/UserIcon';
import {COLORS} from 'shared/constants/colors';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default observer(
  ({
    topic,
    onPress,
    onFollow,
    isFollowed,
  }: {
    topic: Topic;
    onPress?: () => void;
    onFollow?: () => void;
    isFollowed?: boolean;
  }) => {
    return (
      <RN.View style={styles.container}>
        <RN.Pressable style={styles.leftBox} onPress={onPress}>
          <RN.View style={styles.avatarBox}>
            {topic.avatar ? (
              <RN.Image
                source={{uri: topic.avatar}}
                style={styles.topicAvatar}
              />
            ) : (
              <UserIcon size={24} color={COLORS.white} />
            )}
          </RN.View>
          <RN.View style={styles.title}>
            <RN.Text children={topic.title} color={COLORS.white} size="h3" />
            <RN.Text
              children={topic.description}
              color={COLORS.textGray}
              size="h6"
            />
          </RN.View>
        </RN.Pressable>
        <Button
          title={isFollowed ? 'Following' : 'Follow'}
          width={80}
          height={45}
          outline={isFollowed}
          onPress={onFollow}
        />
      </RN.View>
    );
  },
);

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalizeHeight(50),
  },
  avatarBox: {
    height: normalizeHeight(50),
    width: normalizeWidth(50),
    backgroundColor: COLORS.dargGray,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  topicAvatar: {
    width: '100%',
    height: '100%',
  },
  leftBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    gap: 2,
  },
});

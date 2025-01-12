import {Topic} from '@types';
import Avatar from 'components/Avatar/Avatar';
import {Button} from 'components/Button';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';

export default observer(
  ({
    topic,
    onPress,
    onFollow,
    isFollowed,
    titleColor,
    loading,
    isFollowBtnShow,
  }: {
    topic: Topic;
    onPress?: () => void;
    onFollow?: () => void;
    isFollowed?: boolean;
    titleColor?: string;
    loading: boolean;
    isFollowBtnShow: boolean;
  }) => {
    const {t} = useTranslation();
    const {local} = useRootStore();

    return (
      <RN.Pressable style={styles.container} onPress={onPress}>
        <RN.View style={styles.leftBox}>
          <RN.View>
            <Avatar
              uri={topic.avatar}
              isShowFollowBtn={isFollowed}
              onPressFollowBtn={onFollow}
              size={50}
              isUser={false}
            />
          </RN.View>
          <RN.View style={styles.title}>
            <RN.Text
              children={topic.title}
              color={titleColor ? titleColor : COLORS.white}
              size="h3"
              font="Medium"
            />
            <RN.Text
              children={`${topic?.followerIds?.length}  ${t('followers')} ${
                topic.postIds?.length
              } ${t('posts')}`}
              color={COLORS.textGray}
              size="h6"
            />
          </RN.View>
        </RN.View>
        {!topic?.followerIds.includes(local.userId as never) ||
        isFollowBtnShow ? (
          <Button
            onPress={onFollow}
            title={
              topic?.followerIds.includes(local.userId as never)
                ? `${t('joined')}`
                : `${t('join')}`
            }
            width={70}
            height={30}
            loading={loading}
          />
        ) : null}
      </RN.Pressable>
    );
  },
);

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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

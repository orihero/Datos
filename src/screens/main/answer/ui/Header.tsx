import Avatar from 'components/Avatar/Avatar';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

const HeaderView = () => {
  const {paddingTop} = useAppViewInsets();
  const {state} = useRootStore().post;
  const {show} = useRootStore().visible;
  const height = useMemo(() => normalizeHeight(30) + paddingTop, [paddingTop]);

  const goBackHandle = () => {
    NavigationService.goBack();
  };

  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.TouchableOpacity style={styles.iconButton} onPress={goBackHandle}>
        <ArrowLeftIcon size={24} color={COLORS.white} />
      </RN.TouchableOpacity>
      <RN.Pressable
        style={styles.topicInfo}
        onPress={() => show('previewTopic')}>
        <RN.Text color={COLORS.white} size="h1">
          {state.previewPost?.topic?.title}
        </RN.Text>
        <RN.Text color={COLORS.textGray} size="h6">
          {state.previewPost?.topic?.followerIds?.length} Followers
        </RN.Text>
      </RN.Pressable>
      <RN.Pressable
        style={styles.topicAvatarBox}
        onPress={() => show('previewTopic')}>
        <Avatar
          isUser={false}
          size={55}
          uri={state.previewPost?.topic?.avatar}
        />
      </RN.Pressable>
    </RN.View>
  );
};

export default observer(HeaderView);

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    backgroundColor: COLORS.dargGray,
    paddingBottom: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: COLORS.lightGray,
    width: normalizeWidth(40),
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: normalizeWidth(15),
    borderRadius: 40,
    bottom: normalizeHeight(20),
  },
  topicInfo: {
    paddingBottom: normalizeHeight(5),
    alignItems: 'center',
  },
  topicAvatarBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    bottom: normalizeHeight(20),
  },
  topicAvatar: {
    width: normalizeWidth(50),
    height: normalizeHeight(50),
    borderRadius: 50,
  },
});

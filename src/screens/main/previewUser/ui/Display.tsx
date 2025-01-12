import {User} from '@types';
import {Button} from 'components/Button';
import ListItem from 'components/ListItem/ListItem';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {FC, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {convertToShortDate} from 'shared/utils/date';
import {normalizeHeight} from 'shared/utils/dimensions';

const floatViewHeight = normalizeHeight(132);

interface Props {
  user: User;
}

const Display: FC<Props> = ({user}) => {
  const {t} = useTranslation();
  const {local} = useRootStore();
  const {onFollowToUser} = useRootStore().user;

  const fullName = useMemo(
    () => `${user.firstName} ${user.lastName}`,
    [user.firstName, user.lastName],
  );
  const isLoading = useMemo(
    () =>
      !user.firstName ||
      !user.lastName ||
      !user.nickname ||
      !user.userImageUrl ||
      !user.level,
    [
      user.firstName,
      user.lastName,
      user.level,
      user.nickname,
      user.userImageUrl,
    ],
  );

  const date = useMemo(
    () => convertToShortDate(user.createdAt ? user.createdAt : Date.now()),
    [user.createdAt],
  );

  return (
    <>
      <Spacing height={20} />
      <RN.View pb={floatViewHeight * 0.6}>
        <RN.View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.black} />
          ) : (
            <>
              <RN.Image
                source={{uri: user.userImageUrl!}}
                style={styles.image}
              />
              <Spacing height={10} />
              <RN.Text children={fullName} size="title" font="Medium" />
              <RN.Text children={`@${user.nickname}`} size="h3" />
            </>
          )}
          <Spacing height={10} />
          <Button
            title={
              user?.followerIds.includes(local.userId as never)
                ? `${t('following')}`
                : `${t('follow')}`
            }
            onPress={() => onFollowToUser(user, 'previewUser')}
            width={100}
            height={30}
            outline
          />
        </RN.View>
        <RN.View style={styles.floatFooter}>
          <RN.View style={styles.item}>
            <RN.Text children={`${t('level')}`} style={styles.lightSubTitle} />
            <RN.Text
              children={`${user.level?.level}`}
              style={styles.subTitle}
            />
          </RN.View>
          <RN.View style={styles.item}>
            <RN.Text children={`${t('since')}`} style={styles.lightSubTitle} />
            <RN.Text children={date && date} style={styles.subTitle} />
          </RN.View>
          <RN.View style={styles.item}>
            <RN.Text children={`${t('points')}`} style={styles.lightSubTitle} />
            <RN.Text children={`${user.points}`} style={styles.subTitle} />
          </RN.View>
        </RN.View>
      </RN.View>
      <Spacing height={20} />
      <ListItem
        title={`${t('posts')}`}
        onPress={() =>
          NavigationService.navigate(HOME_STACK.PREVIEW_USER_POSTS)
        }
      />
    </>
  );
};
export default observer(Display);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: normalizeHeight(270),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 124,
    height: 124,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  floatFooter: {
    position: 'absolute',
    zIndex: -1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    bottom: 0,
    backgroundColor: COLORS.dargGray,
    width: '100%',
    height: floatViewHeight,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingBottom: normalizeHeight(16),
  },
  item: {
    alignItems: 'center',
  },
  lightSubTitle: {
    fontFamily: FontFamily.Medium,
    color: COLORS.darkGray2,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: COLORS.white,
  },
});

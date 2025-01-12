import {User} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {convertToShortDate} from 'shared/utils/date';
import {normalizeHeight} from 'shared/utils/dimensions';

const floatViewHeight = normalizeHeight(132);

export default observer(
  ({
    firstName,
    lastName,
    nickname,
    userImageUrl,
    createdAt,
    level,
    points,
  }: User) => {
    const {t} = useTranslation();
    const fullName = useMemo(
      () => `${firstName} ${lastName}`,
      [firstName, lastName],
    );
    const isLoading = useMemo(
      () => !firstName || !lastName || !nickname || !userImageUrl || !level,
      [firstName, lastName, level, nickname, userImageUrl],
    );

    const date = useMemo(
      () => convertToShortDate(createdAt ? createdAt : Date.now()),
      [createdAt],
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
                <RN.Image source={{uri: userImageUrl!}} style={styles.image} />
                <Spacing height={10} />
                <RN.Text children={fullName} size="title" font="Medium" />
                <RN.Text children={`@${nickname}`} size="h3" />
              </>
            )}
          </RN.View>
          <RN.View style={styles.floatFooter}>
            <RN.View style={styles.item}>
              <RN.Text children={t('level')} style={styles.lightSubTitle} />
              <RN.Text children={`${level?.level}`} style={styles.subTitle} />
            </RN.View>
            <RN.View style={styles.item}>
              <RN.Text children={t('since')} style={styles.lightSubTitle} />
              <RN.Text children={date && date} style={styles.subTitle} />
            </RN.View>
            <RN.View style={styles.item}>
              <RN.Text children={t('points')} style={styles.lightSubTitle} />
              <RN.Text children={`${points}`} style={styles.subTitle} />
            </RN.View>
          </RN.View>
        </RN.View>
      </>
    );
  },
);

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

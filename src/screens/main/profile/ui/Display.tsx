import {User} from '@types';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import React, {useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {convertToShortDate} from 'shared/utils/date';
import {normalizeHeight} from 'shared/utils/dimensions';

const floatViewHeight = normalizeHeight(132);

export default ({
  firstName,
  lastName,
  neckname,
  userImageUrl,
  createAt,
}: User) => {
  const fullName = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName],
  );
  const isLoading = useMemo(
    () => !firstName || !lastName || !neckname || !userImageUrl,
    [firstName, lastName, neckname, userImageUrl],
  );

  const date = useMemo(() => convertToShortDate(createAt), [createAt]);

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
              <RN.Text children={`@${neckname}`} size="h3" />
            </>
          )}
        </RN.View>
        <RN.View style={styles.floatFooter}>
          <RN.View style={styles.item}>
            <RN.Text children="Followers" style={styles.lightSubTitle} />
            <RN.Text children="894" style={styles.subTitle} />
          </RN.View>
          <RN.View style={styles.item}>
            <RN.Text children="Folowing" style={styles.lightSubTitle} />
            <RN.Text children="542" style={styles.subTitle} />
          </RN.View>
          <RN.View style={styles.item}>
            <RN.Text children="Since" style={styles.lightSubTitle} />
            <RN.Text children={date} style={styles.subTitle} />
          </RN.View>
        </RN.View>
      </RN.View>
    </>
  );
};

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

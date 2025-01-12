import {Button} from 'components/Button';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default observer(
  ({title, isTopics}: {title: string; isTopics: boolean}) => {
    const {t} = useTranslation();
    const {paddingTop} = useAppViewInsets();
    const {state, onCreatePost, loadingWhenCreatePost} = useRootStore().post;
    const height = useMemo(
      () => normalizeHeight(30) + paddingTop,
      [paddingTop],
    );

    const goBackHandle = () => {
      NavigationService.goBack();
    };

    return (
      <RN.View style={[styles.header, {paddingTop: height}]}>
        <RN.TouchableOpacity style={styles.iconButton} onPress={goBackHandle}>
          <ArrowLeftIcon size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
        <RN.Text color={COLORS.white} size="h1">
          {title}
        </RN.Text>
        {isTopics && (
          <RN.View style={styles.nextBtn}>
            <Button
              title={`${t('finish')}`}
              width={80}
              height={40}
              outline
              borderColor={COLORS.transparent}
              loading={loadingWhenCreatePost.loading}
              disabled={!state.newPostState.topic._id}
              onPress={onCreatePost}
              textSize="h3"
            />
          </RN.View>
        )}
      </RN.View>
    );
  },
);

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    backgroundColor: COLORS.dargGray,
    paddingBottom: 25,
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
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    bottom: normalizeHeight(20),
  },
});

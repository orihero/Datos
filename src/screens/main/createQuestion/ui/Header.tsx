import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {HOME_STACK} from 'shared/navigation/routes';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default observer(() => {
  const {t} = useTranslation();
  const {paddingTop} = useAppViewInsets();
  const {state, onClearPostData} = useRootStore().post;
  const height = useMemo(() => normalizeHeight(30) + paddingTop, [paddingTop]);

  const gobackHandle = () => {
    NavigationService.goBack();
    onClearPostData();
  };

  return (
    <RN.View style={[styles.header, {paddingTop: height}]}>
      <RN.TouchableOpacity style={styles.iconButton} onPress={gobackHandle}>
        <CloseIcon size={32} color={COLORS.white} />
      </RN.TouchableOpacity>
      <RN.Text color={COLORS.white} size="h1">
        {t('new_post')}
      </RN.Text>
      <RN.TouchableOpacity
        style={styles.nextBtn}
        onPress={() => NavigationService.navigate(HOME_STACK.TOPICS)}
        disabled={
          !state.newPostState.title.length ||
          (state.newPostState.type === 'Poll' &&
            !state.newPostState.pollOptions[0].text.length)
        }>
        <RN.Text
          children={t('next')}
          color={
            !state.newPostState.title.length ? COLORS.textGray : COLORS.blue
          }
          size="h3"
          font="Medium"
        />
      </RN.TouchableOpacity>
    </RN.View>
  );
});

const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLORS.dargGray,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  iconButton: {
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    left: normalizeWidth(15),
    bottom: normalizeHeight(20),
    borderRadius: 40,
    aspectRatio: 1.5,
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
    paddingVertical: 10,
    bottom: normalizeHeight(20),
  },
});

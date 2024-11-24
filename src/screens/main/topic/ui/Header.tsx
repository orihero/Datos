import {Button} from 'components/Button';
import RN from 'components/RN';
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import {COLORS} from 'shared/constants/colors';
import {useAppViewInsets} from 'shared/hooks/useAppViewInsets';
import NavigationService from 'shared/navigation/NavigationService';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

export default observer(
  ({title, isTopics}: {title: string; isTopics: boolean}) => {
    const {paddingTop} = useAppViewInsets();
    const {onClearPostData, state, onCreatePost, loadingWhenCreatePost} =
      useRootStore().post;
    const height = useMemo(
      () => normalizeHeight(25) + paddingTop,
      [paddingTop],
    );

    const goBackHandle = () => {
      onClearPostData();
      NavigationService.goBack();
    };

    return (
      <RN.View style={[styles.header, {paddingTop: height}]}>
        <RN.TouchableOpacity style={styles.iconButton} onPress={goBackHandle}>
          <ArrowLeftIcon size={24} color={COLORS.black} />
        </RN.TouchableOpacity>
        <RN.Text color={COLORS.white} size="h1">
          {title}
        </RN.Text>
        {isTopics && (
          <RN.View style={styles.nextBtn}>
            <Button
              title="Finish"
              width={80}
              height={40}
              loading={loadingWhenCreatePost.loading}
              disabled={!state.newPostState.topics.length}
              onPress={onCreatePost}
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
    paddingBottom: 5,
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
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: normalizeWidth(15),
  },
});

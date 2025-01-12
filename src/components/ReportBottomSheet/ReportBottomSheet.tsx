import {Button} from 'components/Button';
import ListItem from 'components/ListItem/ListItem';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import CloseIcon from 'shared/assets/icons/CloseIcon';
import PostIcon from 'shared/assets/icons/PostIcon';
import {COLORS} from 'shared/constants/colors';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {CoreStyle} from 'shared/styles/globalStyles';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';

interface ReportBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  reports: [];
  onPressItem?: () => void;
}

const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  isVisible,
  onClose,
  reports,
  onPressItem,
}) => {
  const {t} = useTranslation();
  const {post} = useRootStore();
  const [isOther, setIsOther] = React.useState(false);

  const onPressItemHandle = useCallback(
    (message: string) => {
      post.setReportMessage('message', message);
      post.onReportToPost();
      if (!post.state.reportLoading) {
        setIsOther(false);
      }
    },
    [post],
  );

  const onSendReportHandle = useCallback(() => {
    post.onReportToPost();
    if (!post.state.reportLoading) {
      setIsOther(false);
    }
  }, [post]);

  const renderItem = useCallback(
    ({item}: {item: {id: string; name: string}}) => {
      return (
        <ListItem
          title={`${t(item.name)}`}
          onPress={() => {
            item.name === 'other'
              ? setIsOther(!isOther)
              : onPressItemHandle(item.name);
          }}
          key={item.id}
          rightItem={
            item.name === 'other' ? (
              <RN.TouchableOpacity
                style={styles.arrowIcon}
                onPress={() => setIsOther(!isOther)}>
                <ArrowDownIcon size={24} color={COLORS.white} />
              </RN.TouchableOpacity>
            ) : (
              <RN.TouchableOpacity
                style={styles.reportIcon}
                onPress={() => onPressItemHandle(item.name)}>
                <PostIcon size={24} color={COLORS.white} />
              </RN.TouchableOpacity>
            )
          }
        />
      );
    },
    [isOther, onPressItem, onPressItemHandle, t],
  );

  return (
    <RN.Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAwareScrollView
        contentContainerStyle={CoreStyle.flexGrow1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <RN.View style={styles.overlay}>
          <RN.View style={styles.container}>
            <RN.Text size="h2" font="Medium" color={COLORS.white}>
              {t('report')}
            </RN.Text>
            <Spacing height={20} />
            <RN.Text
              size="h3"
              font="Medium"
              color={COLORS.white}
              style={{textAlign: 'center'}}>
              {`${t('why_reporting')}`}
            </RN.Text>
            {isOther ? (
              <RN.TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setIsOther(false)}>
                <CloseIcon size={32} color={COLORS.white} />
              </RN.TouchableOpacity>
            ) : (
              <RN.TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                <CloseIcon size={32} color={COLORS.white} />
              </RN.TouchableOpacity>
            )}
            <Spacing steps={3} />
            <RN.View>
              {isOther ? (
                <RN.View>
                  <RN.TextInput
                    onChangeText={e => post.setReportMessage('message', e)}
                    placeholder="Please specify"
                    style={styles.inputDesc}
                    placeholderTextColor={COLORS.textGray}
                    multiline
                    textAlignVertical="top"
                    value={post.state.reportMessage?.message}
                  />
                  <Spacing height={15} />
                  <Button
                    title={`${t('send')}`}
                    onPress={onSendReportHandle}
                    loading={post.state.reportLoading}
                    disabled={
                      !post.state.reportMessage?.message?.trim()?.length
                    }
                  />
                </RN.View>
              ) : (
                <RN.FlatList
                  data={reports}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <Spacing height={10} />}
                  keyExtractor={(_, index) => index.toString()}
                />
              )}
            </RN.View>
            <Spacing height={20} />
          </RN.View>
        </RN.View>
      </KeyboardAwareScrollView>
    </RN.Modal>
  );
};

export default observer(ReportBottomSheet);

const styles = RN.StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 10,
  },
  arrowIcon: {
    transform: [{rotate: '-90deg'}],
  },
  inputDesc: {
    borderWidth: 1,
    borderColor: COLORS.textGray,
    borderRadius: 15,
    color: COLORS.white,
    height: normalizeHeight(100),
    paddingHorizontal: normalizeWidth(10),
    paddingVertical: normalizeHeight(20),
  },
  reportIcon: {},
});

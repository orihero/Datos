import {Button} from 'components/Button';
import RN from 'components/RN';
import {Spacing} from 'components/Spacing';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useState} from 'react';
import CameraIcon from 'shared/assets/icons/CameraIcon';
import {COLORS} from 'shared/constants/colors';
import {FontFamily} from 'shared/constants/fonts';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native';
import {InterestType} from '@types';
import DismissKeyboard from 'components/DismissKeyboard/DismissKeyboard';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import {useTranslation} from 'react-i18next';

const floatViewHeight = normalizeHeight(132);

export default observer(() => {
  const {t} = useTranslation();
  const {
    onChangeOfNewTopicState,
    state,
    onCreateNewTopic,
    onSelectTopicAvatar,
    loadingWhenCreateTopic,
    loadingWhenPutAvatar,
  } = useRootStore().topic;
  const {allInterests} = useRootStore().local;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeExtra: true,
      },
      async response => {
        if (response.didCancel || response.errorMessage) {
          console.log('User cancelled image picker or there was an error');
        } else {
          const file = response.assets ? response.assets[0] : null;
          onSelectTopicAvatar(file as never);
        }
      },
    );
  };

  const handleInterestSelect = useCallback(
    (interest: InterestType) => {
      onChangeOfNewTopicState('category', interest.name);
      setDropdownVisible(false);
    },
    [onChangeOfNewTopicState],
  );

  return (
    <DismissKeyboard>
      <RN.View pb={floatViewHeight * 0.6}>
        <Spacing height={20} />
        <RN.View style={styles.container}>
          <RN.View style={styles.imageBox}>
            <RN.Image
              source={{uri: state.newAvatar.uri}}
              style={styles.image}
            />
            {loadingWhenPutAvatar.loading ? (
              <ActivityIndicator color={COLORS.blue} size={32} />
            ) : (
              <RN.TouchableOpacity
                style={styles.iconButton}
                onPress={handlePickImage}>
                <CameraIcon size={32} color={COLORS.white} />
              </RN.TouchableOpacity>
            )}
          </RN.View>
        </RN.View>
        <Spacing height={20} />
        <RN.View>
          <RN.TextInput
            onChangeText={e => onChangeOfNewTopicState('title', e)}
            value={state.newTopicState.title}
            style={styles.input}
            placeholder={`${t('title')}`}
            placeholderTextColor={COLORS.textGray}
          />
          <Spacing height={20} />
          <RN.TextInput
            onChangeText={e => onChangeOfNewTopicState('description', e)}
            value={state.newTopicState.description}
            placeholder={`${t('description')}`}
            style={styles.inputDesc}
            placeholderTextColor={COLORS.textGray}
            multiline
            textAlignVertical="top"
          />
          <Spacing height={20} />
          <RN.View style={styles.category}>
            <RN.View>
              {state.newTopicState.category ? (
                <RN.Text
                  color={COLORS.white}
                  children={state.newTopicState.category}
                />
              ) : (
                <RN.Text
                  color={COLORS.textGray}
                  children={`${t('category')}`}
                />
              )}
            </RN.View>
            {dropdownVisible ? (
              <RN.TouchableOpacity
                style={styles.hideDropdown}
                onPress={() => setDropdownVisible(false)}>
                <ArrowDownIcon size={24} color={COLORS.white} />
              </RN.TouchableOpacity>
            ) : (
              <RN.TouchableOpacity
                style={styles.showDropdown}
                onPress={() => setDropdownVisible(true)}>
                <ArrowDownIcon size={24} color={COLORS.white} />
              </RN.TouchableOpacity>
            )}
          </RN.View>
          {dropdownVisible && (
            <RN.ScrollView style={styles.dropdown}>
              {allInterests.map((item, index) => (
                <RN.View key={index}>
                  <RN.TouchableOpacity
                    style={[styles.interestButton]}
                    onPress={() => handleInterestSelect(item)}>
                    <RN.Image
                      source={{uri: item.img}}
                      resizeMode="cover"
                      style={styles.iconImg}
                    />
                    <RN.Text style={[styles.interestText]}>
                      {item?.name}
                    </RN.Text>
                  </RN.TouchableOpacity>
                  <Spacing height={5} />
                </RN.View>
              ))}
            </RN.ScrollView>
          )}
          <Spacing height={20} />
          <Button
            title={`${t('save')}`}
            disabled={
              !state.newTopicState.title.length ||
              !state.newTopicState.description.length ||
              !state.newTopicState.category.length ||
              !state.newAvatar.uri
            }
            loading={loadingWhenCreateTopic.loading}
            onPress={onCreateNewTopic}
          />
        </RN.View>
      </RN.View>
    </DismissKeyboard>
  );
});

const styles = RN.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeHeight(200),
    width: normalizeWidth(200),
    backgroundColor: COLORS.white,
    borderRadius: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
    position: 'absolute',
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
  iconButton: {
    backgroundColor: COLORS.lightGray2,
    width: normalizeWidth(54),
    aspectRatio: 1,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    color: COLORS.white,
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    borderRadius: 15,
    width: '100%',
  },
  inputDesc: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
    color: COLORS.white,
    height: normalizeHeight(100),
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
  },
  category: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: normalizeWidth(15),
    paddingVertical: normalizeHeight(15),
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    maxHeight: normalizeHeight(300),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    backgroundColor: COLORS.dargGray,
    marginTop: normalizeHeight(260),
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    padding: 5,
  },
  hideDropdown: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: `${180}deg`}],
  },
  showDropdown: {
    width: normalizeWidth(30),
    height: normalizeHeight(30),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dropdownItemText: {
    color: COLORS.white,
    fontSize: normalizeHeight(16),
  },

  interestText: {
    fontSize: 14,
    color: COLORS.black,
  },

  interestButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImg: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
});

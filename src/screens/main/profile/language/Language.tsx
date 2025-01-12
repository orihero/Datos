import RN from 'components/RN';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {COLORS} from 'shared/constants/colors';
import {Spacing} from 'components/Spacing';
import {normalizeHeight, normalizeWidth} from 'shared/utils/dimensions';
import CheckboxIcon from 'shared/assets/icons/CheckboxIcon';
import {MMKV} from 'react-native-mmkv';
import i18n from 'localization/i18n';
import {useRootStore} from 'shared/store/hooks/useRootStore';
import {useTranslation} from 'react-i18next';

export const storage = new MMKV();

const Language = () => {
  const {t} = useTranslation();
  const {local} = useRootStore();
  console.log('i18n', i18n?.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    local.setLanguage(lang);
    storage.set('language', lang);
  };

  return (
    <>
      <RN.Pressable
        onPress={() => changeLanguage('uz')}
        style={[
          styles.languageItem,
          {
            backgroundColor:
              local.currentLanguage === 'uz' ? COLORS.blue : COLORS.dargGray,
          },
        ]}>
        {local.currentLanguage === 'uz' ? (
          <CheckboxIcon size={22} color={COLORS.green} />
        ) : (
          <RN.View style={styles.radio} />
        )}
        <RN.Text color={COLORS.white}>{t('uz')}</RN.Text>
      </RN.Pressable>
      <Spacing height={10} />
      <RN.Pressable
        onPress={() => changeLanguage('en')}
        style={[
          styles.languageItem,
          {
            backgroundColor:
              local.currentLanguage === 'en' ? COLORS.blue : COLORS.dargGray,
          },
        ]}>
        {local.currentLanguage === 'en' ? (
          <CheckboxIcon size={20} color={COLORS.green} />
        ) : (
          <RN.View style={styles.radio} />
        )}
        <RN.Text color={COLORS.white}>{t('en')}</RN.Text>
      </RN.Pressable>
      <Spacing height={10} />
      <RN.Pressable
        onPress={() => changeLanguage('ru')}
        style={[
          styles.languageItem,
          {
            backgroundColor:
              local.currentLanguage === 'ru' ? COLORS.blue : COLORS.dargGray,
          },
        ]}>
        {local.currentLanguage === 'ru' ? (
          <CheckboxIcon size={20} color={COLORS.green} />
        ) : (
          <RN.View style={styles.radio} />
        )}
        <RN.Text color={COLORS.white}>{t('ru')}</RN.Text>
      </RN.Pressable>
    </>
  );
};

export default observer(Language);

const styles = RN.StyleSheet.create({
  languageItem: {
    paddingHorizontal: normalizeWidth(10),
    paddingVertical: normalizeHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.dargGray,
    borderRadius: 15,
  },
  radio: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.darkGray2,
  },
});

import React from 'react';
import {CustomText, CustomView} from '../../../components/atoms';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../../Auth/AuthContext';
import OptionsButton from '../../../components/molecules/OptionsButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const [showLanguageOption, setShowLanguageOption] = React.useState(false);
  const [showThemeOption, setShowThemeOption] = React.useState(false);
  const [curLang, setCurLang] = React.useState('');
  const [curScheme, setCurScheme] = React.useState('');
  const {language, changeLanguage, changeTheme} = React.useContext(AuthContext);

  const getCurLang = async () => {
    let curLangue = await AsyncStorage.getItem('language');
    availableLanguage.map(item => {
      if (item.code == curLangue) {
        setCurLang(item.lang);
      }
    });
  };

  const getCurScheme = async () => {
    let curTheme = await AsyncStorage.getItem('theme');
    availableTheme.map(item => {
      if (item.type == curTheme) {
        setCurScheme(item.theme);
      }
    });
  };

  const availableLanguage = [
    {lang: 'English', code: 'en'},
    {lang: 'Deutsch', code: 'de'},
    {lang: 'Tiếng Việt', code: 'vn'},
    {lang: 'Frankreich', code: 'fr'},
    {lang: 'ジャパニーズ', code: 'ja'},
  ];

  const availableTheme = [
    {theme: language.theme_creme, type: 'light'},
    {theme: language.theme_latte, type: 'green'},
    {theme: language.theme_sky, type: 'sky'},
    {theme: language.theme_thristle, type: 'thristle'},
    {theme: language.theme_gold, type: 'gold'},
    {theme: language.theme_pink, type: 'pink'},
    {theme: language.theme_dark, type: 'dark'},
  ];

  const onOptionPressed = lang => {
    changeLanguage(lang);
    setShowLanguageOption(false);
  };

  const onThemePressed = async type => {
    console.log(type);
    changeTheme(type);
    availableTheme.map(item => {
      if (item.type == type) {
        setCurScheme(item.theme);
      }
    });
    setShowThemeOption(false);
  };

  React.useEffect(() => {
    getCurLang();
    getCurScheme();
  });

  return (
    <CustomView>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        customStyles={{marginStart: '5%'}}>
        {language.settings_text_language}
      </CustomText>
      <CustomButton onPress={setShowLanguageOption} type={'social'}>
        {curLang ? curLang : 'English'}
      </CustomButton>

      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={16}
        customStyles={{marginStart: '5%'}}>
        {language.settings_text_theme}
      </CustomText>
      <CustomButton onPress={setShowThemeOption} type={'social'}>
        {curScheme}
      </CustomButton>

      {showLanguageOption ? (
        <OptionsButton onBackgroundPressed={setShowLanguageOption}>
          <CustomText textStyle={'normalBold'}>
            {language.settings_text_language}
          </CustomText>
          {availableLanguage.map((item, index) => {
            return (
              <CustomButton
                onPress={() => onOptionPressed(item.code)}
                type={'tertiary'}>
                {item.lang}
              </CustomButton>
            );
          })}
        </OptionsButton>
      ) : (
        <></>
      )}

      {showThemeOption ? (
        <OptionsButton onBackgroundPressed={setShowThemeOption}>
          <CustomText textStyle={'normalBold'}>
            {language.settings_text_theme}
          </CustomText>
          {availableTheme.map((item, index) => {
            return (
              <CustomButton
                onPress={() => onThemePressed(item.type)}
                type={'tertiary'}>
                {item.theme}
              </CustomButton>
            );
          })}
        </OptionsButton>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default SettingScreen;

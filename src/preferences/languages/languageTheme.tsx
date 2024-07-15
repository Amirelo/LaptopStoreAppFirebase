import {NativeModules} from 'react-native';
import vn from './vn';
import en from './en';
import de from './de';
import fr from './fr';
import ja from './ja';

export const languageTheme = {
  vn,
  en,
  de,
  fr,
  ja,
};

export const useLanguage = () => {
  const {localeIdentifier} = NativeModules.I18nManager;
  let locale:String = localeIdentifier.slice(0, 2);
  if (locale == typeof languageTheme) {
    return languageTheme['en'];
  } else{
    let language = languageTheme[locale as keyof typeof languageTheme];
    return language;
  }
};

export const checkLanguage = (lang: keyof typeof languageTheme) => {
  if (
    !(lang in languageTheme)
    ) {
    return () => useLanguage();
  }
  return languageTheme[lang];
};

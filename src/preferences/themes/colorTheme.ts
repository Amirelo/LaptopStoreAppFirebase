import {useColorScheme} from 'react-native';
import light from './light';
import creme from './creme';
import green from './green';
import sky from './sky';
import thristle from './thristle';
import gold from './gold';
import pink from './pink';
import dark from './dark';

export const ColorTheme = {
  light,
  creme,
  green,
  sky,
  thristle,
  gold,
  pink,
  dark,
};

export const useThemeColors = () => {
  var colors = light;
  const colorScheme = useColorScheme();
  if (colorScheme && colorScheme in ColorTheme) {
    colors = ColorTheme[colorScheme];
  }
  return colors;
};

export const setThemeColors = (type?: keyof typeof ColorTheme) => {
  var colors;
  if (type == null) {
    const colorScheme = useColorScheme();
    if (colorScheme && colorScheme in ColorTheme) {
      colors = ColorTheme[colorScheme];
    }
    return colors;
  }
  return ColorTheme[type];
};

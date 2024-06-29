import {useColorScheme} from 'react-native';
import light from './light';
import green from './green';
import sky from './sky';
import thristle from './thristle';
import gold from './gold';
import pink from './pink';
import dark from './dark';

export const ColorTheme = {
  light,
  green,
  sky,
  thristle,
  gold,
  pink,
  dark,
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = ColorTheme[colorScheme];
  return colors;
};

export const setThemeColors = (type?:keyof typeof ColorTheme) => {
  if (ColorTheme[type] == null) {
    const colorScheme = useColorScheme();
    const colors = ColorTheme[colorScheme];
    return colors;
  }
  return ColorTheme[type];
};

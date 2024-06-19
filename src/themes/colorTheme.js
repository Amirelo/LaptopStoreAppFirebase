import {useColorScheme} from 'react-native';

const Colors = {
  light: {
    textColor: '#000',
    textVariantColor: '#514948',
    textConstrastColor: '#fff',
    backgroundColor: '#D0C2AE',
    noneColor: '#00000000',
    backgroundInputColor: '#E4DACB',
    imageBackgroundColor: '#D0C2AE',
    tabBarColor: '#ECE2D3',
    tabBarActiveTintColor: '#967259',
    borderColor: '#ECE2D3',
    primaryColor: '#967259',
    primaryLightColor: '#EBF0FF',
    errColor: '#F71B38',
    warnColor: '#C4C805',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  green: {
    textColor: '#000',
    textVariantColor: '#303430',
    textConstrastColor: '#fff',
    backgroundColor: '#97A97C',
    noneColor: '#00000000',
    backgroundInputColor: '#DCF5DB',
    imageBackgroundColor: '#97A97C',
    tabBarColor: '#D9E7D9',
    tabBarActiveTintColor: '#519951',
    borderColor: '#D9E7D9',
    primaryColor: '#519951',
    primaryLightColor: '#D9E7D9',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  sky: {
    textColor: '#000',
    textVariantColor: '#474B47',
    textConstrastColor: '#fff',
    backgroundColor: '#AAC7DB',
    imageBackgroundColor: '#AAC7DB',
    tabBarColor: '#D0D6DB',
    tabBarActiveTintColor: '#6DACD7',
    noneColor: '#00000000',
    backgroundInputColor: '#D0D6DB',
    borderColor: '#D0D6DB',
    primaryColor: '#6DACD7',
    primaryLightColor: '#D0D6DB',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  thristle: {
    textColor: '#000',
    textVariantColor: '#484747',
    textConstrastColor: '#fff',
    backgroundColor: '#C8B8DB',
    imageBackgroundColor: '#C8B8DB',
    tabBarColor: '#F9F4F5',
    tabBarActiveTintColor: '#70587C',
    noneColor: '#00000000',
    backgroundInputColor: '#DAD3DD',
    borderColor: '#F9F4F5',
    primaryColor: '#70587C',
    primaryLightColor: '#F9F4F5',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  gold: {
    textColor: '#000',
    textVariantColor: '#5F5A44',
    textConstrastColor: '#fff',
    backgroundColor: '#FFD93D',
    imageBackgroundColor: '#FFD93D',
    tabBarColor: '#FFF2BB',
    tabBarActiveTintColor: '#FF8400',
    noneColor: '#00000000',
    backgroundInputColor: '#FFEB99',
    borderColor: '#FFF2BB',
    primaryColor: '#FF8400',
    primaryLightColor: '#FFF2BB',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  pink: {
    textColor: '#FFFFFF',
    textVariantColor: '#E8DEDE',
    textConstrastColor: '#000',
    backgroundColor: '#EC9192',
    noneColor: '#00000000',
    backgroundInputColor: '#E6B8B9',
    imageBackgroundColor: '#EC9192',
    tabBarColor: '#E8DEDE',
    tabBarActiveTintColor: '#DB5375',
    borderColor: '#E8DEDE',
    primaryColor: '#DB5375',
    primaryLightColor: '#E8DEDE',
    errColor: '#F71B38',
    warnColor: '#B29784',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
  dark: {
    textColor: '#626262',
    textVariantColor: '#F2F2F2',
    textConstrastColor: '#000',
    backgroundColor: '#AFAFAF',
    noneColor: '#00000000',
    backgroundInputColor: '#C1BEBE',
    imageBackgroundColor: '#7A7D7D',
    tabBarColor: '#F2F2F2',
    tabBarActiveTintColor: '#565254',
    borderColor: '#F2F2F2',
    primaryColor: '#565254',
    primaryLightColor: '#F2F2F2',
    errColor: '#F71B38',
    warnColor: '#B29784',
    successColor: '#03B700',
    processColor: '#0F01B5',
  },
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export const setThemeColors = type => {
  if (Colors[type] == null) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme];
    return colors;
  }
  return Colors[type];
};

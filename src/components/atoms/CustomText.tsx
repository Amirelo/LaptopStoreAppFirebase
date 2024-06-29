// React and libs
import React from 'react';
import {DimensionValue, StyleSheet, Text, TextStyle} from 'react-native';

// Contexts
import {AuthContext} from '../../screens/Auth/AuthContext';

// User Preferences
import {ColorTheme} from '../../preferences/themes/colorTheme';

interface Props {
  children: String;
  color?: keyof (typeof ColorTheme)['light'];
  preset?: keyof typeof styles;
  bold?: boolean;
  marginBottom?: DimensionValue;
  hasBox?: boolean;
  maxLines?: number;
  flex?: boolean;
  alignSelf?: TextStyle['alignSelf'];
  width?: DimensionValue;
  styles?: TextStyle;
}

const CustomText = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors: (typeof ColorTheme)['light'] = theme;
  return (
    <Text
      numberOfLines={props.maxLines}
      style={[
        {
          color: props.color != null ? colors[props.color] : colors.text,
          marginBottom: props.marginBottom,
          width: props.width,
          flex: props.flex ? 1 : 0,
          alignSelf: props.alignSelf,
        },
        props.styles,
        props.hasBox
          ? {padding: 16, backgroundColor: colors.background, borderRadius: 10}
          : null,
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;

// Text Preset
const styles = StyleSheet.create({
  small: {fontSize: 12},
  smallBold: {fontSize: 12, fontWeight: 'bold'},
  smallUnderscore: {fontSize: 12, textDecorationLine: 'underline'},
  smallStrike: {fontSize: 12, textDecorationLine: 'line-through'},

  normal: {fontSize: 14},
  normalBold: {fontSize: 14, fontWeight: 'bold'},
  normalUnderscore: {fontSize: 14, textDecorationLine: 'underline'},
  normalStrike: {fontSize: 14, textDecorationLine: 'line-through'},

  subtitle: {fontSize: 16},
  subtitleBold: {fontSize: 16, fontWeight: 'bold'},

  title: {fontSize: 18},
  titleBold: {fontSize: 18, fontWeight: 'bold'},

  subheader: {fontSize: 20},
  subheaderBold: {fontSize: 20, fontWeight: 'bold'},

  header: {fontSize: 22},
  headerBold: {fontSize: 22, fontWeight: 'bold'},
});

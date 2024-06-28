import {ColorValue, DimensionValue, StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import {textTheme} from '../../themes/textTheme';
import {AuthContext} from '../../screens/Auth/AuthContext';

interface Props{
  children: String,
  textColor?: ColorValue,
  textStyle?: keyof typeof textTheme,
  customStyles?: TextStyle,
  marginTop?: DimensionValue,
  hasBox?: boolean,
  maxLines?: number,
  hasFlex?: boolean,
  alignSelf?: TextStyle['alignSelf'],
  width?: DimensionValue,
}

const CustomText = (props:Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  return (
    <Text
      numberOfLines={props.maxLines}
      style={[{
        color: props.textColor != null? colors[`${String(props.textColor)}Color`] :colors.textColor,
        marginTop: props.marginTop,
        width: props.width,
        flex: props.hasFlex ? 1 : 0,
        alignSelf: props.alignSelf,

      },
      props.customStyles,
      props.hasBox ? styles.box : null
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  box: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

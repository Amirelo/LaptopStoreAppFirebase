import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {textTheme} from '../../themes/textTheme';
import {AuthContext} from '../../screens/Auth/AuthContext';

const CustomText = ({
  children,
  textColor,
  textStyle,
  customStyles,
  marginTop,
  hasBox,
  maxLines,
  hasFlex,
  alignSelf,
}) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  return (
    <Text
      numberOfLines={maxLines}
      style={[
        textColor != null
          ? {color: colors[`${textColor}Color`]}
          : {color: colors.textColor},
        textStyle != null ? textTheme[`text_${textStyle}`] : {},
        marginTop != null ? {marginTop: marginTop} : {marginTop: 8},
        hasBox ? styles.box : {},
        hasFlex ? {flex: 1} : {},
        alignSelf ? {alignSelf: alignSelf, paddingStart: '5%'} : {},
        customStyles,
      ]}>
      {children}
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

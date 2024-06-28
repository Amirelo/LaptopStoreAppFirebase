import {Animated, DimensionValue, KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomImage from '../atoms/CustomImage';
import * as images from '../../assets/images';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../preferences/borderTheme';
import {AuthContext} from '../../screens/Auth/AuthContext';

interface Props{
  placeholder: String,
  source?: any,
  marginTop?: DimensionValue,
  onChangeText?(): void,
  keyboardType?: KeyboardTypeOptions,
  value?: String,
  disabled?: boolean,
  isPassword?: boolean
}

//const internetImg = {uri:'https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg'}
const CustomInput = (props:Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const [showPassImg, setShowPassImg] = useState(images.ic_visibility);
  const [secure, setSecure] = useState(props.isPassword);
  const [isSelected, setIsSelected] = useState(false);
  let borderColor = isSelected ? 'primary' : 'border';
  let borderStyle = borderTheme.textInput;
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };
  const borderCol = useRef(new Animated.Value(1)).current;
  const onFocus = () => {
    setIsSelected(true);
    const borderColorAnim = borderCol.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.textVariantColor, colors.primaryColor],
    });
  };

  const onBlur = () => {
    setIsSelected(false);
  };

  return (
    <CustomView
      type={'inputrow'}
      backgroundColor={'backgroundInput'}
      marginTop={props.marginTop}
      borderStyle={borderStyle}
      borderColor={borderColor}>
      {props.source != null ? (
        <CustomImage source={props.source} type={'inputIcon'} />
      ) : (
        <></>
      )}
      <TextInput
        onChangeText={props.onChangeText}
        style={[styles.inputStyle, props.source == null ? {paddingStart: 10} : {}]}
        value={props.value+""}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={props.disabled}
        selectTextOnFocus={props.disabled}
        placeholder={props.placeholder + ""}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        secureTextEntry={secure}
      />
      {props.isPassword ? (
        <CustomButton
          source={showPassImg}
          type={'image'}
          marginTop={0}
          onPress={onPressVisibility}
        />
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: '100%',
    flex: 1,
  },
});

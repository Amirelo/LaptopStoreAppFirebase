// React and libs
import React, {useRef, useState} from 'react';
import {
  Animated,
  DimensionValue,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
} from 'react-native';

// Contexts
import {AuthContext} from '../../screens/Auth/AuthContext';

// Components
import CustomImage from '../atoms/CustomImage';
import CustomButton from './button/CustomButton';
import CustomView from '../atoms/CustomView';

// Assets
import * as images from '../../assets/images';

interface Props {
  placeholder?: String;
  source?: any;
  marginBottom?: DimensionValue;
  onChangeText?(text: String): void;
  keyboardType?: KeyboardTypeOptions;
  value?: String;
  disabled?: boolean;
  isPassword?: boolean;
}

//const internetImg = {uri:'https://cdn.pixabay.com/photo/2019/07/14/16/29/pen-4337524_1280.jpg'}
const CustomInput = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const [showPassImg, setShowPassImg] = useState(images.ic_visibility);
  const [secure, setSecure] = useState(props.isPassword);
  const [isSelected, setIsSelected] = useState(false);
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };
  const borderCol = React.useRef(new Animated.Value(1)).current;
  const borderColChange = borderCol.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textVariantColor, colors.primaryColor],
  });
  const onFocus = () => {
    setIsSelected(true);
    
  };

  const onBlur = () => {
    setIsSelected(false);
  };

  return (
    <CustomView
      preset={'inputrow'}
      backgroundColor={'backgroundInput'}
      marginBottom={props.marginBottom}
      border={'textInput'}
      styles={{borderColor: borderColChange}}
      borderColor={isSelected ? 'primary' : 'border'}>
      {props.source != null ? (
        <CustomImage source={props.source} preset={'inputIcon'} />
      ) : (
        <></>
      )}
      <TextInput
        onChangeText={props.onChangeText}
        style={[
          styles.inputStyle,
          props.source == null ? {paddingStart: 10} : {},
        ]}
        value={props.value + ''}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={props.disabled}
        selectTextOnFocus={props.disabled}
        placeholder={props.placeholder + ''}
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

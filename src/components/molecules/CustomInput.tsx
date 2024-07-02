// React and libs
import React from 'react';
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
  onChangeText(text: string): void;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  disabled?: boolean;
  isPassword?: boolean;
}

const CustomInput = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const [showPassImg, setShowPassImg] = React.useState(images.ic_visibility);
  const [secure, setSecure] = React.useState(props.isPassword);
  const [isSelected, setIsSelected] = React.useState(false);
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };
  const borderCol = React.useRef(new Animated.Value(0)).current;
  const borderColChange = borderCol.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textVariant, colors.primary],
  });
  const onFocus = () => {
    setIsSelected(true);
    Animated.timing(borderCol, {toValue: 1,duration: 200, useNativeDriver:true}).start()
  };

  const onBlur = () => {
    setIsSelected(false);
    Animated.timing(borderCol, {toValue: 0,duration: 200, useNativeDriver:true}).start()
    
  };

  return (
    <CustomView
      
      preset={'inputrow'}
      backgroundColor={'backgroundInput'}
      marginBottom={props.marginBottom}
      border={'textInput'}
      styles={{borderColor: borderColChange}}>
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
        value={props.value}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={props.disabled}
        // selectTextOnFocus={props.disabled}
        placeholder={props.placeholder + ''}
        keyboardType={props.keyboardType}
        secureTextEntry={secure}
      />
      {props.isPassword ? (
        <CustomButton
          source={showPassImg}
          preset={'image'}
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

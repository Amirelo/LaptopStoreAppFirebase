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
import {CustomText} from '../atoms';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText(text: string): void;
  source?: any;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  marginBottom?: DimensionValue;
  maxLength?: number;
  disabled?: boolean;
  obscure?: boolean;
}

const CustomInput = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const [showPassImg, setShowPassImg] = React.useState(images.ic_visibility);
  const [secure, setSecure] = React.useState(props.obscure);
  const onPressVisibility = () => {
    setSecure(!secure);
    showPassImg == images.ic_visibility
      ? setShowPassImg(images.ic_visibility_off)
      : setShowPassImg(images.ic_visibility);
  };
  const borderAnim = React.useRef(new Animated.Value(0)).current;
  const errorAnim = React.useRef(new Animated.Value(0)).current;

  const borderAnimITP = borderAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [colors.err, colors.textVariant, colors.primary],
  });

  const onFocus = () => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onError = () => {
    Animated.timing(borderAnim, {
      toValue: -1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (props.error != null && props.error.length > 0) {
      onError();
    }
  }, [props.error]);

  return (
    <>
      <CustomView
        preset={'inputrow'}
        backgroundColor={'backgroundInput'}
        border={'textInput'}
        marginBottom={0}
        styles={{borderColor: borderAnimITP}}>
        {props.source != null ? (
          <CustomImage source={props.source} preset={'inputIcon'} />
        ) : (
          <></>
        )}
        <TextInput
          onChangeText={props.onChangeText}
          maxLength={props.maxLength}
          autoCapitalize={'none'}
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
        {props.obscure ? (
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
      <CustomText
        maxHeight={props.error ? 500 : 0}
        marginBottom={8}
        color="err"
        alignSelf={'flex-start'}>
        {props.error ?? ''}
      </CustomText>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: '100%',
    flex: 1,
  },
});

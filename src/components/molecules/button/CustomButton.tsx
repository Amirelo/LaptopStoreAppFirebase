import {
  Animated,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  DimensionValue,
  FlexStyle,
  ColorValue,
} from 'react-native';
import React, {useRef} from 'react';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import {deviceWidth} from '../../../utils/helper';
import {AuthContext} from '../../../screens/Auth/AuthContext';

interface Props {
  children?: any;
  type?: keyof typeof styles;
  marginTop?: DimensionValue;
  alignSelf?: FlexStyle['alignSelf'];
  source?: any;
  onPress?(): void;
  customStyles?: any;
  disabled?: boolean;
  noAnim?: boolean;
  backgroundColor?: ColorValue;
}

const CustomButton = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors = theme;
  const buttonBackgroundColor = props.backgroundColor
    ? colors[props.backgroundColor]
    : props.type && props.type.includes('primary')
    ? colors.primaryColor
    : props.type == 'social'
    ? colors.backgroundInputColor
    : 'transparent';
  const borderColor = props.type == 'social' ? colors.borderColor : '';
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const textColor =
    props.type == 'tertiary' || props.type == 'social'
      ? 'text'
      : props.type == 'highlight'
      ? 'primary'
      : 'textConstrast';
  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      style={[
        {
          alignSelf: props.alignSelf,
          marginTop: props.marginTop,
        },
      ]}
      onPress={props.onPress}
      onPressIn={fadeIn}
      disabled={props.disabled}>
      <Animated.View
        style={[
          props.type != null ? styles[props.type] : {},
          {
            backgroundColor: buttonBackgroundColor,
            borderColor: borderColor,
          },
          props.customStyles,
          props.noAnim ? {} : {opacity: fadeAnim},
        ]}>
        {props.type == 'social' ? (
          <CustomImage source={props.source} preset={'socialIcon'} />
        ) : props.type == 'image' ? (
          <CustomImage source={props.source} preset={'inputIcon'} />
        ) : (
          <></>
        )}
        {props.type != 'image' ? (
          props.disabled == true && props.type == 'primary' ? (
            <ActivityIndicator
              size={'large'}
              color={colors.backgroundInputColor}
            />
          ) : (
            <CustomText
              marginBottom={0}
              color={textColor}
              preset={
                props.type == 'tertiary'
                  ? 'normal'
                  : props.type == 'social'
                  ? 'center'
                  : 'normalBold'
              }>
              {props.children}
            </CustomText>
          )
        ) : (
          <></>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  primary: {
    width: deviceWidth * 0.9,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  primarySmall: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  social: {
    flexDirection: 'row',
    width: deviceWidth * 0.9,
    height: 56,
    alignItems: 'center',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 32,
  },
  tertiary: {},
  highlight: {},
  image: {},
});

import {Animated, ColorValue, DimensionValue, FlexStyle, Pressable} from 'react-native';
import React, {useRef} from 'react';
import {AuthContext} from '../../screens/Auth/AuthContext';
import { CustomView } from '.';

interface Props{
  children:any,
  disabled?: boolean,
  onPress?(): void,
  alignSelf?: FlexStyle['alignSelf'],
  marginTop?: DimensionValue,
  backgroundColor?: ColorValue,
  borderStyle?: any,
  borderColor?: ColorValue,
  type?: any,
  paddingVertical?:DimensionValue,
}

const CustomButtonBare = (props:Props) => {
  const {theme} = React.useContext(AuthContext);
  const backgroundColor =
    props.backgroundColor != null ? theme[`${String(props.backgroundColor)}Color`] : '';
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
      style={
        [{
          alignSelf: props.alignSelf,
          marginTop: props.marginTop,
          borderColor: props.borderColor != null
              ? {borderColor: theme[`${String(props.borderColor)}Color`]}
              : {borderColor: theme.borderColor},
          paddingVertical: props.paddingVertical,
          
        },
        props.borderStyle
      ]
      
    }
      onPress={props.onPress}
      onPressIn={fadeIn}
      disabled={props.disabled}>
      <CustomView
        animated={true}
        marginTop={0}
        backgroundColor={'none'}
        type={props.type ? props.type : 'none'}
        customStyles={{
          opacity: fadeAnim,
        }}>
        {props.children}
      </CustomView>
    </Pressable>
  );
};

export default CustomButtonBare;

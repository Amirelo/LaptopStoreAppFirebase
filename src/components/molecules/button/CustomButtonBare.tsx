import {Animated, ColorValue, DimensionValue, FlexStyle, Pressable, StyleSheet, ViewStyle} from 'react-native';
import React, {useRef} from 'react';
import {AuthContext} from '../../../screens/Auth/AuthContext';
import { CustomView } from '../../atoms';
import { ColorTheme } from '../../../preferences/themes/colorTheme';

interface Props{
  children:any,
  disabled?: boolean,
  onPress?(): void,
  width?: DimensionValue;
  height?:DimensionValue;
    alignSelf?: FlexStyle['alignSelf'],
  marginBottom?: DimensionValue,
  backgroundColor?: ColorValue,
  border?: keyof typeof borderStyles,
  borderColor?: keyof typeof ColorTheme['light'],
  alignItems?: ViewStyle['alignItems']
  type?: any,
  paddingVertical?:DimensionValue,
}

const CustomButtonBare = (props:Props) => {
  const {theme} = React.useContext(AuthContext);
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
          width: props.width,
          height: props.height,
          alignSelf: props.alignSelf,
          justifyContent:'center',
          marginBottom: props.marginBottom,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor != null
              ?  theme[props.borderColor]
              :  theme.borderColor,
          paddingVertical: props.paddingVertical,
          
        },
        props.border ? borderStyles[props.border] : null
        
      ]
      
    }
      onPress={props.onPress}
      onPressIn={fadeIn}
      disabled={props.disabled}>
      <CustomView
        marginBottom={0}
        backgroundColor={'none'}
        alignItems={props.alignItems}
        preset={props.type ? props.type : 'none'}
        styles={{
          opacity: fadeAnim,
        }}>
        {props.children}
      </CustomView>
    </Pressable>
  );
};

export default CustomButtonBare;

const borderStyles = StyleSheet.create({
  textInput: {borderRadius: 6, borderWidth: 3},
  button: {borderRadius: 10},
  banner: {borderRadius: 20},
  borderOnly: {borderRadius: 0, borderWidth: 3},
  social:{borderRadius:10, borderWidth:1}
});
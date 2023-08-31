import {Animated, Pressable} from 'react-native';
import React, {useRef} from 'react';
import CustomView from './CustomView';
import {AuthContext} from '../../screens/Auth/AuthContext';

const CustomButtonBare = ({
  children,
  disabled,
  onPress,
  alignSelf,
  marginTop,
  backgroundColor,
  borderStyle,
  borderColor,
  type,
  paddingVertical,
}) => {
  const {theme} = React.useContext(AuthContext);
  backgroundColor =
    backgroundColor != null ? theme[`${backgroundColor}Color`] : '';
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
      style={[
        alignSelf != null ? {alignSelf: alignSelf} : {},
        marginTop ? {marginTop: marginTop} : {},
        borderStyle != null ? borderStyle : {},
        borderColor != null
          ? {borderColor: theme[`${borderColor}Color`]}
          : {borderColor: theme.borderColor},
        {backgroundColor: backgroundColor},
        paddingVertical ? {paddingVertical: paddingVertical} : {},
      ]}
      onPress={onPress}
      onPressIn={fadeIn}
      disabled={disabled}>
      <CustomView
        animated={true}
        marginTop={0}
        backgroundColor={'none'}
        type={type ? type : 'none'}
        customStyles={{
          opacity: fadeAnim,
        }}>
        {children}
      </CustomView>
    </Pressable>
  );
};

export default CustomButtonBare;

import {
  Animated,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  DimensionValue,
} from 'react-native';
import React from 'react';
import CustomText from '../../atoms/CustomText';
import {deviceWidth} from '../../../utils/helper';
import {AuthContext} from '../../../screens/Auth/AuthContext';
import {ColorTheme} from '../../../preferences/themes/colorTheme';
import {CustomButtonBare} from '../../atoms';

interface Props {
  children: any;
  marginbottom?: DimensionValue;
  onPress?(): void;
  disabled?: boolean;
}

const PrimaryButton = (props: Props) => {
  const {theme} = React.useContext(AuthContext);
  const colors: (typeof ColorTheme)['light'] = theme;

  return (
    <CustomButtonBare
      alignItems="center"
      backgroundColor={colors.primary}
      marginBottom={props.marginbottom ?? 8}
      border={'button'}
      width={'100%'}
      height={56}
      onPress={props.onPress}
      >
      {props.disabled == true ? (
        <ActivityIndicator size={'large'} color={colors.backgroundInput} />
      ) : (
        <CustomText marginBottom={0} color={'background'} preset={'normalBold'}>
          {props.children}
        </CustomText>
      )}
    </CustomButtonBare>
  );
};

export default PrimaryButton;



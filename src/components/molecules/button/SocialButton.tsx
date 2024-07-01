import React from 'react';
import {CustomImage, CustomText} from '../../atoms';
import CustomButtonBare from './CustomButtonBare';
import { DimensionValue } from 'react-native';

interface Props {
  source?: string;
  children: string;
  disabled?: boolean;
  onPress(): void;
  marginBottom?: DimensionValue
}

const SocialButton = (props: Props) => {
  return (
    <CustomButtonBare
      alignItems="center"
      border={'social'}
      width={'100%'}
      height={56}
      marginBottom={props.marginBottom ?? 8}
      disabled={props.disabled}
      onPress={props.onPress}>
        {props.source ? 
      <CustomImage source={props.source} preset={'socialIcon'} />
      :<></>}
      <CustomText marginBottom={0} preset={'normalBold'}>
        {props.children}
      </CustomText>
    </CustomButtonBare>
  );
};

export default SocialButton;

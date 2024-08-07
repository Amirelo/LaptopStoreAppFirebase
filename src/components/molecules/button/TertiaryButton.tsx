import React from 'react';
import {CustomImage, CustomText} from '../../atoms';
import CustomButtonBare from './CustomButtonBare';
import { DimensionValue, FlexAlignType } from 'react-native';

interface Props {
  children: string | Element |Array<Element>;
  disabled?: boolean;
  alignSelf?: FlexAlignType;
  underline?: boolean;
  onPress(): void;
  marginBottom?: DimensionValue
}

const TertiaryButton = (props: Props) => {
  return (
    <CustomButtonBare
      marginBottom={props.marginBottom ?? 8}
      disabled={props.disabled}
      onPress={props.onPress}
      alignSelf={props.alignSelf}>
        {typeof props.children == 'string' ? 
      <CustomText marginBottom={0} preset={props.underline ? 'normalUnderscore' : 'normal'}>
        {props.children}
      </CustomText>
      : 
      props.children}
    </CustomButtonBare>
  );
};

export default TertiaryButton;

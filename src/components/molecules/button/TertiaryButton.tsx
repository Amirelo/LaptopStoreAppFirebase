import React from 'react';
import {CustomImage, CustomText} from '../../atoms';
import CustomButtonBare from './CustomButtonBare';
import { DimensionValue, FlexAlignType } from 'react-native';

interface Props {
  children: string;
  disabled?: boolean;
  alignSelf?: FlexAlignType;
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
      <CustomText marginBottom={0}>
        {props.children}
      </CustomText>
    </CustomButtonBare>
  );
};

export default TertiaryButton;

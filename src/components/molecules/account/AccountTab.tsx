import React from 'react';
import * as images from '../../../assets/images';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomButtonBare from '../../atoms/CustomButtonBare';
import CustomView from '../../atoms/CustomView';
import {borderTheme} from '../../../preferences/borderTheme';
import { ColorValue, ImageStyle } from 'react-native';

interface Props{
  title:String,
titleColor?:ColorValue,
subtitle?:String,
onPress?(): void,
type?: 'usertab' | 'profile',
source: any,
}

const AccountTab = (props:Props) => {
  return (
    <CustomButtonBare marginTop={12} onPress={props.onPress}>
      <CustomView
        type={'container_accountTab'}
        backgroundColor={'backgroundInput'}
        borderStyle={borderTheme.textInput}>
        <CustomView backgroundColor={'none'} type={'container_rowJustify'}>
              <CustomView backgroundColor={'none'} type={'container_left'}>
                <CustomText
                  textColor={props.titleColor ? props.titleColor : 'text'}
                  textStyle={'text_subtitleBold'}
                  marginTop={2}>
                  {props.title}
                </CustomText>
                <CustomText marginTop={2}>{props.subtitle + ""}</CustomText>
              </CustomView>
              <CustomImage
                type={'searchBarIcon'}
                source={images.ic_arrow_right}
              />
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default AccountTab;

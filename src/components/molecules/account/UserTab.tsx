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
source: any,
}

const UserTab = (props:Props) => {
  return (
    <CustomButtonBare marginTop={12} onPress={props.onPress}>
      <CustomView
        type={'container_accountTab'}
        backgroundColor={'backgroundInput'}
        borderStyle={borderTheme.textInput}>
        <CustomView backgroundColor={'none'} type={'container_rowJustify'}>
            <CustomImage source={props.source} linkType={'uri'} type={'logo'} />
              <CustomText
                textColor={props.titleColor ? props.titleColor : ''}
                marginTop={0}
                textStyle={'text_subtitleBold'}>
                {props.title}
              </CustomText>
              <CustomView marginTop={0} backgroundColor={'none'} type={'container_row'}>
                <CustomText
                  textColor={props.titleColor ? props.titleColor : ''}
                  marginTop={0}>
                  {props.subtitle + ""}
                </CustomText>
                <CustomImage
                  type={'searchBarIcon'}
                  source={images.ic_arrow_right}
                />
              </CustomView>
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default UserTab;

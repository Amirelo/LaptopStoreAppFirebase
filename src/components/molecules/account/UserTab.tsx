import React from 'react';
import * as images from '../../../assets/images';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomButtonBare from '../button/CustomButtonBare';
import CustomView from '../../atoms/CustomView';
import { ColorValue, ImageStyle } from 'react-native';
import { ColorTheme } from '../../../preferences/themes/colorTheme';

interface Props{
  title:String,
titleColor?:keyof typeof ColorTheme['light'],
subtitle?:String,
onPress?(): void,
source: any,
}

const UserTab = (props:Props) => {
  return (
    <CustomButtonBare marginTop={12} onPress={props.onPress}>
      <CustomView
        preset={'accountTab'}
        backgroundColor={'backgroundInput'}
        border={'textInput'}>
        <CustomView backgroundColor={'none'} preset={'rowJustify'}>
            <CustomImage source={props.source} preset={'logo'} />
              <CustomText
                color={props.titleColor}
                marginBottom={0}
                preset={'subtitleBold'}>
                {props.title}
              </CustomText>
              <CustomView marginBottom={0} backgroundColor={'none'} preset={'row'}>
                <CustomText
                  color={props.titleColor}
                  marginBottom={0}>
                  {props.subtitle + ""}
                </CustomText>
                <CustomImage
                  preset={'searchBarIcon'}
                  source={images.ic_arrow_right}
                />
              </CustomView>
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default UserTab;

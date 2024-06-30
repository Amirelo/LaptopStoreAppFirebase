import React from 'react';
import * as images from '../../../assets/images';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomButtonBare from '../button/CustomButtonBare';
import CustomView from '../../atoms/CustomView';
import {ColorValue, ImageStyle} from 'react-native';
import {ColorTheme} from '../../../preferences/themes/colorTheme';

interface Props {
  title: String;
  titleColor?: keyof (typeof ColorTheme)['light'];
  subtitle?: String;
  onPress?(): void;
}

const AccountTab = (props: Props) => {
  return (
    <CustomButtonBare marginTop={12} onPress={props.onPress}>
      <CustomView
        preset={'accountTab'}
        backgroundColor={'backgroundInput'}
        border={'textInput'}>
        <CustomView backgroundColor={'none'} preset={'rowJustify'}>
          <CustomView backgroundColor={'none'} preset={'left'}>
            <CustomText
              color={props.titleColor ? props.titleColor : 'text'}
              preset={'subtitleBold'}
              marginBottom={2}>
              {props.title}
            </CustomText>
            <CustomText marginBottom={2}>{props.subtitle + ''}</CustomText>
          </CustomView>
          <CustomImage
            preset={'searchBarIcon'}
            source={images.ic_arrow_right}
          />
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default AccountTab;

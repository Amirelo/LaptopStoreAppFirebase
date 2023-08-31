import React from 'react';
import * as images from '../../assets/images';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomButtonBare from '../atoms/CustomButtonBare';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

const AccountTab = ({title, titleColor, subtitle, onPress, type, source}) => {
  return (
    <CustomButtonBare marginTop={12} onPress={onPress}>
      <CustomView
        type={'accountTab'}
        backgroundColor={'backgroundInput'}
        borderStyle={borderTheme.textInput}>
        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          {type == 'usertab' ? (
            <CustomImage source={source} linkType={'uri'} type={'logo'} />
          ) : (
            <></>
          )}
          {type == 'profile' ? (
            <>
              <CustomText
                textColor={titleColor ? titleColor : ''}
                marginTop={0}
                textStyle={'subtitleBold'}>
                {title}
              </CustomText>
              <CustomView marginTop={0} backgroundColor={'none'} type={'row'}>
                <CustomText
                  textColor={titleColor ? titleColor : ''}
                  marginTop={0}>
                  {subtitle}
                </CustomText>
                <CustomImage
                  type={'searchBarIcon'}
                  source={images.ic_arrow_right}
                />
              </CustomView>
            </>
          ) : (
            <>
              <CustomView backgroundColor={'none'} type={'left'}>
                <CustomText
                  textColor={titleColor ? titleColor : 'text'}
                  textStyle={'subtitleBold'}
                  marginTop={2}>
                  {title}
                </CustomText>
                <CustomText marginTop={2}>{subtitle}</CustomText>
              </CustomView>
              <CustomImage
                type={'searchBarIcon'}
                source={images.ic_arrow_right}
              />
            </>
          )}
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default AccountTab;

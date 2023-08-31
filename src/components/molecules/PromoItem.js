import React from 'react';
import * as images from '../../assets/images';
import CustomView from '../atoms/CustomView';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import {promoDetail} from '../../utils/helper';
import {borderTheme} from '../../themes/borderTheme';

const PromoItem = ({data}) => {
  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      borderColor={'border'}
      borderStyle={borderTheme.textInput}
      type={'rowJustify90'}>
      <CustomView backgroundColor={'none'}>
        <CustomView backgroundColor={'none'} type={'row'}>
          <CustomText textStyle={'normalBold'}>{data.name}</CustomText>
        </CustomView>
        <CustomText marginTop={8}>
          {promoDetail(data.effect, data.maxEffectValue)}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default PromoItem;

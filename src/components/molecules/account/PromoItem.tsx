import React from 'react';
import * as images from '../../../assets/images';
import CustomView from '../../atoms/CustomView';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import {promoDetail} from '../../../utils/helper';
import {borderTheme} from '../../../preferences/borderTheme';

interface Props{
  data:any
}

const PromoItem = (props:Props) => {
  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      borderColor={'border'}
      borderStyle={borderTheme.textInput}
      type={'rowJustify90'}>
      <CustomView backgroundColor={'none'}>
        <CustomView backgroundColor={'none'} type={'row'}>
          <CustomText textStyle={'text_normalBold'}>{props.data.name}</CustomText>
        </CustomView>
        <CustomText marginTop={8}>
          {promoDetail(props.data.effect, props.data.maxEffectValue)}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default PromoItem;

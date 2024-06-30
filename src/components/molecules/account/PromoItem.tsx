import React from 'react';
import * as images from '../../../assets/images';
import CustomView from '../../atoms/CustomView';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import {promoDetail} from '../../../utils/helper';

interface Props{
  data:any
}

const PromoItem = (props:Props) => {
  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      borderColor={'border'}
      border={'textInput'}
      preset={'rowJustify90'}>
      <CustomView backgroundColor={'none'}>
        <CustomView backgroundColor={'none'} preset={'row'}>
          <CustomText preset={'normalBold'}>{props.data.name}</CustomText>
        </CustomView>
        <CustomText marginBottom={8}>
          {promoDetail(props.data.effect, props.data.maxEffectValue)}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default PromoItem;

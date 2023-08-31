import React from 'react';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomText from '../../../components/atoms/CustomText';
import CustomButtonBare from '../../../components/atoms/CustomButtonBare';
import CustomImage from '../../../components/atoms/CustomImage';

const ExploreFilterScreen = () => {
  return (
    <CustomView>
      <CustomText>Price Range</CustomText>
      <CustomButtonBare>
        <CustomView type={'rowJustify'}>
          <CustomImage type={'searchBarIcon'} source={images.ic_radio_square} />
          <CustomText>0 - 10.000.000</CustomText>
        </CustomView>
      </CustomButtonBare>
      <CustomButtonBare>
        <CustomView type={'rowJustify'}>
          <CustomImage type={'searchBarIcon'} source={images.ic_radio_square} />
          <CustomText>10.000.000 - 25.000.000</CustomText>
        </CustomView>
      </CustomButtonBare>
    </CustomView>
  );
};

export default ExploreFilterScreen;


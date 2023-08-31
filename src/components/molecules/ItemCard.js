import React from 'react';
import CustomText from '../atoms/CustomText';
import CustomView from '../atoms/CustomView';
import CustomButton from './CustomButton';
import {borderTheme} from '../../themes/borderTheme';
import {useNavigation} from '@react-navigation/native';

const ItemCard = ({data}) => {
  const navigation = useNavigation();
  const cardNumber = () => {
    let cardNumber = data.cardNumber;
    let hiddenNum = '**** **** **** ' + cardNumber.slice(-3);
    return hiddenNum;
  };

  const onEditPressed = () => {
    navigation.navigate('New Card', {data: data});
  };

  return (
    <CustomView
      type={'tab'}
      borderColor={'border'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText>{cardNumber()}</CustomText>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'normalBold'}>Card holder</CustomText>
        <CustomText textStyle={'normalBold'}>Expiry date</CustomText>
      </CustomView>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText>{data.cardHolder}</CustomText>
        <CustomText>{data.expiryMonth + '/' + data.expiryYear}</CustomText>
      </CustomView>
      <CustomButton type={'primarySmall'} onPress={onEditPressed}>Edit</CustomButton>
    </CustomView>
  );
};

export default ItemCard;

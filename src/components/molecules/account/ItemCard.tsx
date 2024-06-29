import React from 'react';
import CustomText from '../../atoms/CustomText';
import CustomView from '../../atoms/CustomView';
import CustomButton from '../button/CustomButton';
import {borderTheme} from '../../../preferences/borderTheme';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props{
  data: any
}

const ItemCard = (props:Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const cardNumber = () => {
    let cardNumber = props.data.cardNumber;
    let hiddenNum = '**** **** **** ' + cardNumber.slice(-3);
    return hiddenNum;
  };

  const onEditPressed = () => {
    navigation.navigate('New Card', {data: props.data});
  };

  return (
    <CustomView
      type={'tab'}
      borderColor={'border'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText>{cardNumber()}</CustomText>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'text_normalBold'}>Card holder</CustomText>
        <CustomText textStyle={'text_normalBold'}>Expiry date</CustomText>
      </CustomView>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText>{props.data.cardHolder}</CustomText>
        <CustomText>{props.data.expiryMonth + '/' + props.data.expiryYear}</CustomText>
      </CustomView>
      <CustomButton type={'primarySmall'} onPress={onEditPressed}>Edit</CustomButton>
    </CustomView>
  );
};

export default ItemCard;

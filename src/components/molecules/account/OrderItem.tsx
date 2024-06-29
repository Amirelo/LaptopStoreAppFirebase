import {StyleSheet} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CustomView from '../../atoms/CustomView';
import CustomText from '../../atoms/CustomText';
import {priceFormat} from '../../../utils/helper';
import CustomButton from '../button/CustomButton';
import {AuthContext} from '../../../screens/Auth/AuthContext';
import {borderTheme} from '../../../preferences/borderTheme';

interface Props{
  item?:any,
address?:any,
}

const OrderItem = (props:Props) => {
  const [totalItems, setTotalItems] = useState(0);
  const navigation = useNavigation<NavigationProp<any>>();
  const {onGetUserOrderDetail, language} = useContext(AuthContext);

  const orderStatusArr = [
    {status: language.arr_status_order_0, color: 'err'},
    {status: language.arr_status_order_1, color: 'process'},
    {status: language.arr_status_order_2, color: 'text'},
    {status: language.arr_status_order_3, color: 'warn'},
    {status: language.arr_status_order_4, color: 'success'},
  ];

  const itemDate = props.item.arrivedDate
    ? props.item.arrivedDate
    : props.item.deliveryDate
    ? props.item.deliveryDate
    : props.item.prepareDate
    ? props.item.prepareDate
    : props.item.pendingDate;

  const orderAddress = (addressID:String) => {
    return props.address.filter(addressItem => {
      console.log('Address item', addressItem);
      return addressItem.addressID == addressID;
    })[0];
  };

  const initData = async () => {
    console.log("---OrderItem:", props.item);
    setTotalItems(0);
    const orderDetailResult = await onGetUserOrderDetail(props.item.orderID);
    orderDetailResult.map(curItem => {
      setTotalItems(prev => prev + curItem.productQuantity);
    });
  };

  const getOrderStatus = () => {
    return orderStatusArr[props.item.status].status;
  };
  const status = getOrderStatus();

  const onDetailButtonPressed = () => {
    navigation.navigate('Order Details', {
      item: props.item,
      address: orderAddress(item.addressID),
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      borderStyle={borderTheme.textInput}
      type={'tab'}>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'text_normalBold'} hasFlex={true}>
          {language.order_text_orderNumber}
        </CustomText>
        <CustomText hasFlex={true}>{props.item.orderID}</CustomText>
        <CustomText>{itemDate}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'text_normalBold'} hasFlex={true}>
          {language.order_text_quantity}
        </CustomText>
        <CustomText hasFlex={true}>{totalItems+""}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'text_normalBold'} hasFlex={true}>
          {language.order_text_total}
        </CustomText>
        <CustomText hasFlex={true}>{priceFormat(props.item.totalPrice)}</CustomText>
      </CustomView>

      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText textStyle={'text_normalBold'} hasFlex={true}>
          {language.order_text_status}
        </CustomText>
        <CustomText
          hasFlex={true}
          textStyle={'text_normalBold'}
          textColor={orderStatusArr[props.item.status].color}>
          {status}
        </CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} backgroundColor={'none'}>
        <CustomButton
          type={'primarySmall'}
          onPress={onDetailButtonPressed}
          customStyles={styles.itemMargin}>
          {language.order_button_detail}
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 6,
  },
  rowContainerCustom: {
    flexDirection: 'row',
  },
  textStyle: {
    flex: 1,
  },

  textStyle2: {
    flex: 2,
  },
});

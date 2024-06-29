import React, {useContext, useState, useEffect} from 'react';
import {MainContext} from '../MainContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomText from '../../../components/atoms/CustomText';
import CustomButton from '../../../components/molecules/button/CustomButton';
import {displayMessage, priceFormat} from '../../../utils/helper';
import AddressItem from '../../../components/molecules/account/AddressItem';
import {AuthContext} from '../../Auth/AuthContext';

const CheckOutScreen = ({navigation, route}) => {
  const {location, fullName, phoneNumber, totalPrice, note, cart, userID} =
    route.params;

  const [shippingPrice, setShippingPrice] = useState(200000);
  const [finalPrice, setFinalPrice] = useState(totalPrice + shippingPrice);
  const [isDisabled, setIsDisabled] = React.useState(false)

  const {onInsertUserOrder, onInsertOrderDetail, onDemoPaymentVNPay, onDeleteCart} =
    useContext(MainContext);

  const {language} = useContext(AuthContext);

  const onSubmitOrderPressed = async () => {
    setIsDisabled(true)
    const insertOrderResult = await onInsertUserOrder(
      finalPrice,
      finalPrice,
      note,
      fullName,
      shippingPrice,
      location.addressID,
      userID,
      1,
      1,
    );
    console.log('Insert order result:', insertOrderResult);
    if (insertOrderResult == true) {
      for (let index = 0; index < cart.length; index++) {
        const insertOrderDetailResult = await onInsertOrderDetail(
          cart[index].itemQuantity,
          insertOrderResult.userOrderID,
          cart[index].productID,
          cart[index].cartID,
          await onDeleteCart(cart[index].cartID)
          );
        
        console.log('Insert order detail result:', insertOrderDetailResult);

      }
    }
    displayMessage("Order created success")
    navigation.navigate('Cart');
  };

  useEffect(() => {
    console.log('cart', cart);
    console.log('checkout', location);
  }, []);

  return (
    <CustomView>
      <CustomText />
      <AddressItem onlyInfo={true} data={location} />
      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>{language.checkOut_text_product_price}</CustomText>
        <CustomText>{priceFormat(totalPrice)}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>{language.checkOut_text_shipping_price}</CustomText>
        <CustomText>{priceFormat(shippingPrice)}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'} marginTop={8}>
        <CustomText>{language.checkOut_text_summary}</CustomText>
        <CustomText>{priceFormat(finalPrice)}</CustomText>
      </CustomView>

      <CustomButton disabled={isDisabled} onPress={onSubmitOrderPressed} type={'primary'}>
        {language.checkOut_button_place_order}
      </CustomButton>
    </CustomView>
  );
};

export default CheckOutScreen;

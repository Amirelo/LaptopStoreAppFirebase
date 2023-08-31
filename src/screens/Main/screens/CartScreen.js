import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {MainContext} from '../MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCart from '../../../components/molecules/ItemCart';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomText from '../../../components/atoms/CustomText';
import {priceFormat} from '../../../utils/helper';
import CustomView from '../../../components/atoms/CustomView';
import CartOption from '../../../components/molecules/CartOption';
import {AuthContext} from '../../Auth/AuthContext';

const CartScreen = ({navigation}) => {
  const {onGetCartByEmail, onDeleteCart} = useContext(MainContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState();
  const [onItemOptionPressed, setOnItemOptionPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {language} = useContext(AuthContext);

  const onCheckOutPressed = () => {
    if (data.length != 0) {
      navigation.navigate('Recipient Info', {
        totalPrice: totalPrice,
        cart: data,
      });
    } else {
      console.warn('No Item In Cart');
    }
  };

  const onDeleteFromListPressed = async () => {
    const result = await onDeleteCart(selectedItem.cartID);
    console.log(result);
    setTotalPrice(
      prev => prev - selectedItem.productPrice * selectedItem.itemQuantity,
    );
    setData(data.filter(item => item.productID != selectedItem.productID));
    setOnItemOptionPressed(false);
  };

  const onActionOptionPressed = item => {
    setOnItemOptionPressed(true);
    setSelectedItem(item);
    //console.log(item);
  };

  const getData = async () => {
    let email = await AsyncStorage.getItem('email');
    const cartData = await onGetCartByEmail(email);
    //console.log(cartData);
    setData(cartData.data);
    setTotalPrice(0);
    let myPrice = 0;
    if (cartData.data != null) {
      cartData.data.map(item => {
        myPrice += item.productPrice * item.itemQuantity;
      });
      setTotalPrice(myPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const onOptionHidePressed = () => {
    setOnItemOptionPressed(false);
  };

  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      getData();
    });

    return load;
  }, [navigation]);

  return (
    <CustomView>
      <FlatList
        width={'100%'}
        height={'50%'}
        style={{marginTop: 24}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
        data={data}
        keyExtractor={item => item.productID}
        renderItem={({item}) => {
          return (
            <ItemCart
              setTotalPrice={setTotalPrice}
              onActionOptionPressed={onActionOptionPressed}
              item={item}
            />
          );
        }}
      />
      <CustomView type={'rowJustify90'}>
        <CustomText textStyle={'subtitleBold'}>{language.cart_text_total}</CustomText>
        <CustomText textColor={'err'} textStyle={'normalBold'}>
          {priceFormat(totalPrice)}
        </CustomText>
      </CustomView>
      <CustomButton type={'primary'} marginTop={32} onPress={onCheckOutPressed}>
        {language.cart_button_order}
      </CustomButton>
      <CustomText />

      {onItemOptionPressed ? (
        <CartOption
          onDeletePressed={onDeleteFromListPressed}
          onBackgroundPressed={onOptionHidePressed}
        />
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CartScreen;

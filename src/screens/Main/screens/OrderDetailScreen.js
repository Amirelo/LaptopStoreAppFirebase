import {FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import ProductVItem from '../../../components/molecules/product/ProductVItem';
import CustomText from '../../../components/atoms/CustomText';
import CustomView from '../../../components/atoms/CustomView';
import {addressFormat, deviceWidth, priceFormat} from '../../../utils/helper';

const OrderDetailScreen = ({route}) => {
  const {item} = route.params;
  const [productList, setProductList] = useState([]);
  const {onGetUserOrderDetail, language} = useContext(AuthContext);
  const {onGetProductByID} = useContext(MainContext);
  const [orderAddress, setOrderAddress] = React.useState({})

  const orderStatusArr = [
    {status: language.arr_status_order_0, color: 'err'},
    {status: language.arr_status_order_1, color: 'process'},
    {status: language.arr_status_order_2, color: 'text'},
    {status: language.arr_status_order_3, color: 'warn'},
    {status: language.arr_status_order_4, color: 'success'},
  ];

  console.log('Detail screen', address);

  const getData = async () => {
    const orderDetailResult = await onGetUserOrderDetail(item.orderID);
    try {
      setProductList([]);
      for (let index = 0; index < orderDetailResult.length; index++) {
        const productResult = await onGetProductByID(
          orderDetailResult[index].productID,
        );
        setProductList(oldArr => [...oldArr, productResult[0]]);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getData();
    const address = route.params?.address
    if (address != null){
      setOrderAddress(address)

    }
  }, []);

  return (
    <CustomView scrollable={true}>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={32}>
        {language.orderDetail_textHeader_order}
      </CustomText>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_orderNumber}
        </CustomText>
        <CustomText hasFlex={true}>{item.orderID}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_orderDate}
        </CustomText>
        <CustomText hasFlex={true}>{item.pendingDate}</CustomText>
      </CustomView>

      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_orderStatus}
        </CustomText>
        <CustomText
          textColor={orderStatusArr[item.status].color}
          textStyle={'normalBold'}
          hasFlex={true}>
          {orderStatusArr[item.status].status}
        </CustomText>
      </CustomView>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={20}>
        {language.orderDetail_textHeader_product}
      </CustomText>

      <FlatList
        width={deviceWidth * 0.9}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 8, marginVertical: 16}}
        data={productList}
        keyExtractor={item => item.productID}
        renderItem={({item}) => {
          return <ProductVItem data={item} />;
        }}
      />

      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        marginTop={20}>
        {language.orderDetail_textHeader_info}
      </CustomText>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_shippingAddress}
        </CustomText>
        <CustomText hasFlex={true}>
          {setOrderAddress ? addressFormat(
            setOrderAddress.addressName,
            setOrderAddress.ward,
            setOrderAddress.district,
            setOrderAddress.city,
          ) : ""}
        </CustomText>
      </CustomView>
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_payment}
        </CustomText>
        <CustomText hasFlex={true}>
          {item.cardID ? item.cardID : 'Cash'}
        </CustomText>
      </CustomView>
      {item.discount ? (
        <>
          <CustomView type={'rowJustify90'}>
            <CustomText hasFlex={true}>
              {language.orderDetail_text_discount}
            </CustomText>
            <CustomText hasFlex={true}>
              {item.discountID ? item.counponID : 'none'}
            </CustomText>
          </CustomView>
          <CustomView type={'rowJustify90'}>
            <CustomText hasFlex={true}>
              {language.orderDetail_text_discountCode}
            </CustomText>
            <CustomText hasFlex={true}>
              {item.couponCode ? item.couponCode : 'none'}
            </CustomText>
          </CustomView>
        </>
      ) : (
        <></>
      )}
      <CustomView type={'rowJustify90'}>
        <CustomText hasFlex={true}>
          {language.orderDetail_text_payment}
        </CustomText>
        <CustomText textStyle={'subtitleBold'} textColor={'err'} hasFlex={true}>
          {priceFormat(item.totalPrice)}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default OrderDetailScreen;

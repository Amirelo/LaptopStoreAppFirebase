import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import {MainContext} from '../../../screens/Main/MainContext';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
import {priceFormat} from '../../../utils/helper';
import CustomView from '../../atoms/CustomView';
import ProductModel from '../../../models/ProductModel';
import CartModel from '../../../models/CartModel';

interface Props {
  item: CartModel;
  setTotalPrice?: any;
  onActionOptionPressed(cart:CartModel): any;
}

const ItemCart = (props: Props) => {
  const {onUpdateCartQuantity, onGetProductByID} = useContext(MainContext);
  const [curProduct, setCurProduct] = useState<ProductModel>();

  const [quantity, setQuantity] = useState<number>(props.item.itemQuantity);
  const [canEdit, setCanEdit] = React.useState<boolean>(true);

  const getData = async () => {
    const result = await onGetProductByID(props.item.productID);
    console.log('item result:', result);
    setCurProduct(result);
  };

  const onAddQuantityPressed = async () => {
    setCanEdit(false);
    if (curProduct && quantity < curProduct.productQuantity) {
      await onUpdateCartQuantity(props.item.id, 1);
      setQuantity(quantity + 1);

      props.setTotalPrice((price:number) => price + curProduct.productPrice);
    } else {
      console.log('Not enough quantity');
    }
    setCanEdit(true);
  };

  const onSubtractQuantityPressed = async () => {
    setCanEdit(false);
    if (quantity > 1 ) {
      await onUpdateCartQuantity(props.item.id, -1);
      setQuantity(quantity - 1);
      props.setTotalPrice((price:number) => price - curProduct!.productPrice);
    } else {
      console.log('Fail');
    }
    setCanEdit(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CustomView
      preset={'tab'}
      borderColor={'border'}
      border={'textInput'}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'none'} preset={'row'}>
        <CustomImage
          source={curProduct!.productImageLink}
          preset={'cartItem'}
        />
        <CustomView preset={'left'} backgroundColor={'none'}>
          <CustomView backgroundColor={'none'} preset={'row'}>
            <CustomText
              maxLines={2}
              preset={'normalBold'}
              flex={true}>
              {curProduct!.productName}
            </CustomText>
            <CustomButton
              source={images.ic_more_vert}
              onPress={() => props.onActionOptionPressed(props.item)}
              type={'image'}
              marginTop={8}
            />
          </CustomView>
          <CustomText preset={'normalBold'} maxLines={2} color={'err'}>
            {priceFormat(curProduct!.productPrice * quantity)}
          </CustomText>
          <CustomView backgroundColor={'none'} preset={'row'}>
            <CustomButton
              disabled={!canEdit}
              onPress={onSubtractQuantityPressed}
              source={images.ic_minus}
              type={'image'}
            />
            <CustomText>{quantity+''}</CustomText>
            <CustomButton
              disabled={!canEdit}
              onPress={onAddQuantityPressed}
              source={images.ic_add}
              type={'image'}
            />
          </CustomView>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default ItemCart;

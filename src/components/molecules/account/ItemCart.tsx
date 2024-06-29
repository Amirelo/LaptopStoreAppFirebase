import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import {MainContext} from '../../../screens/Main/MainContext';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
import {priceFormat} from '../../../utils/helper';
import CustomView from '../../atoms/CustomView';
import {borderTheme} from '../../../preferences/borderTheme';

interface Props {
  item?: any;
  setTotalPrice?: any;
  onActionOptionPressed(): any;
}

const ItemCart = (props: Props) => {
  const {onUpdateCartQuantity, onGetProductByID} = useContext(MainContext);
  const [curProduct, setCurProduct] = useState([]);

  const [quantity, setQuantity] = useState(props.item.itemQuantity);
  const [canEdit, setCanEdit] = React.useState(true);

  const getData = async () => {
    const result = await onGetProductByID(props.item.productID);
    console.log('item result:', result);
    setCurProduct(result);
  };

  const onAddQuantityPressed = async () => {
    setCanEdit(false);
    if (quantity < curProduct.productQuantity) {
      await onUpdateCartQuantity(props.item.cartID, 1);
      setQuantity(quantity + 1);

      setTotalPrice(price => price + curProduct.productPrice);
    } else {
      console.log('Not enough quantity');
    }
    setCanEdit(true);
  };

  const onSubtractQuantityPressed = async () => {
    setCanEdit(false);
    if (quantity > 1) {
      await onUpdateCartQuantity(props.item.cartID, -1);
      setQuantity(quantity - 1);
      setTotalPrice(price => price - curProduct.productPrice);
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
      type={'tab'}
      borderColor={'border'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'transparent'} type={'row'}>
        <CustomImage
          source={curProduct.productImageLink}
          linkType={'uri'}
          type={'cartItem'}
        />
        <CustomView type={'left'} backgroundColor={'transparent'}>
          <CustomView backgroundColor={'none'} type={'row'}>
            <CustomText
              maxLines={2}
              textStyle={'text_normalBold'}
              hasFlex={true}>
              {curProduct.productName}
            </CustomText>
            <CustomButton
              source={images.ic_more_vert}
              onPress={() => props.onActionOptionPressed(item)}
              type={'image'}
              marginTop={8}
            />
          </CustomView>
          <CustomText textStyle={'text_normalBold'} maxLines={2} textColor={'err'}>
            {priceFormat(curProduct.productPrice * quantity)}
          </CustomText>
          <CustomView backgroundColor={'transparent'} type={'row'}>
            <CustomButton
              disabled={!canEdit}
              onPress={onSubtractQuantityPressed}
              source={images.ic_minus}
              type={'image'}
            />
            <CustomText>{quantity}</CustomText>
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
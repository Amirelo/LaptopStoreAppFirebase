import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { priceFormat } from '../../../utils/helper';
import CustomView from '../../atoms/CustomView';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import { MainContext } from '../../../screens/Main/MainContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CustomButtonBare } from '../../atoms';

interface Props{
  data:any
}

const ProductVItem = (props:Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    onGetProductProcessor,
    onGetProductMemory,
    onGetProductScreen,
    onGetProductStorage,
  } = useContext(MainContext);
  const [itemProcessor, setItemProcessor] = useState();
  const [itemMemory, setItemMemory] = useState();
  const [itemScreen, setitemScreen] = useState();
  const [itemStorage, setitemStorage] = useState();
  const [isDisabled, setIsDisabled] = useState<boolean>();

  const onProductPressed = () => {
    navigation.navigate('Product Detail', {
      item: props.data,
      itemProcessor: itemProcessor,
      itemMemory: itemMemory,
      itemScreen: itemScreen,
      itemStorage: itemStorage,
    });
  };

  const getInitData = async () => {
    setIsDisabled(true);
    const processor = await onGetProductProcessor(props.data.processorID);
    console.log(processor);
    setItemProcessor(processor);

    const memory = await onGetProductMemory(props.data.memoryID);
    setItemMemory(memory);

    const screen = await onGetProductScreen(props.data.screenID);
    setitemScreen(screen);

    const storage = await onGetProductStorage(props.data.storageID);
    setitemStorage(storage);

    setIsDisabled(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <CustomButtonBare
      onPress={onProductPressed}
      borderColor={'border'}
      backgroundColor={'backgroundInput'}
      borderStyle={borderTheme.textInput}
      type={'rowJustify90Screen'}
      disabled={isDisabled}
      paddingVertical={8}>
      <CustomImage
        marginTop={0}
        source={props.data.productImageLink}
        type={'productItem'}
        linkType={'uri'}
      />
      <CustomView marginTop={0} backgroundColor={'none'} type={'left'}>
        <CustomText textStyle={'text_normalBold'} maxLines={2} marginTop={0}>
          {props.data.productName}
        </CustomText>
        <CustomText textStyle={'text_small'} marginTop={2}>
          {itemProcessor ? itemProcessor.name : <ActivityIndicator />}
        </CustomText>
        {
          itemMemory ? 
          <CustomText textStyle={'text_small'} marginTop={2}>
          {itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed }
        </CustomText>
           :
           <ActivityIndicator />
        }
        {
          itemStorage ? 
          <CustomText textStyle={'text_small'} marginTop={2}>
          {itemStorage.type + ' ' + itemStorage.currentStorage }
        </CustomText>: <ActivityIndicator/>
        }
        {itemScreen?
        <CustomText textStyle={'text_small'} marginTop={2}>
        {itemScreen.resolution + ' ' + itemScreen.screenSize}
      </CustomText> : <ActivityIndicator/>
        }

        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          <CustomText textColor={'err'} textStyle={'text_normalBold'} marginTop={0}>
            {priceFormat(data.currentPrice)}
          </CustomText>

          {props.data.currentPrice != props.data.productPrice ? (
            <CustomText
              textStyle={'text_smallStrike'}
              textColor={'textVariant'}
              marginTop={0}>
              {priceFormat(props.data.productPrice)}
            </CustomText>
          ) : (
            <></>
          )}
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default ProductVItem;

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { priceFormat } from '../../utils/helper';
import CustomView from '../atoms/CustomView';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import { MainContext } from '../../screens/Main/MainContext';
import { useNavigation } from '@react-navigation/native';
import { CustomButtonBare } from '../atoms';
import { borderTheme } from '../../preferences/borderTheme';

const ProductVItem = ({ data }) => {
  const navigation = useNavigation();
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
  const [isDisabled, setIsDisabled] = useState();

  const onProductPressed = () => {
    navigation.navigate('Product Detail', {
      item: data,
      itemProcessor: itemProcessor,
      itemMemory: itemMemory,
      itemScreen: itemScreen,
      itemStorage: itemStorage,
    });
  };

  const getInitData = async () => {
    setIsDisabled(true);
    const processor = await onGetProductProcessor(data.processorID);
    console.log(processor);
    setItemProcessor(processor);

    const memory = await onGetProductMemory(data.memoryID);
    setItemMemory(memory);

    const screen = await onGetProductScreen(data.screenID);
    setitemScreen(screen);

    const storage = await onGetProductStorage(data.storageID);
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
        source={data.productImageLink}
        type={'productItem'}
        linkType={'uri'}
        backgroundColor={'imageBackground'}
      />
      <CustomView marginTop={0} backgroundColor={'none'} type={'left'}>
        <CustomText textStyle={'normalBold'} maxLines={2} marginTop={0}>
          {data.productName}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemProcessor ? itemProcessor.name : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemMemory ? itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemStorage ? itemStorage.type + ' ' + itemStorage.currentStorage : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'small'} marginTop={2}>
          {itemScreen ? itemScreen.resolution + ' ' + itemScreen.screenSize : <ActivityIndicator />}
        </CustomText>
        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          <CustomText textColor={'err'} textStyle={'normalBold'} marginTop={0}>
            {priceFormat(data.currentPrice)}
          </CustomText>

          {data.currentPrice != data.productPrice ? (
            <CustomText
              textStyle={'smallStrike'}
              textColor={'textVariant'}
              marginTop={0}>
              {priceFormat(data.productPrice)}
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

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { priceFormat } from '../../../utils/helper';
import CustomView from '../../atoms/CustomView';
import CustomImage from '../../atoms/CustomImage';
import CustomText from '../../atoms/CustomText';
import { MainContext } from '../../../screens/Main/MainContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CustomButtonBare } from '../../atoms';
import ProcessorModel from '../../../models/product/ProcessorModel';
import MemoryModel from '../../../models/product/MemoryModel';
import ScreenModel from '../../../models/product/ScreenModel';
import StorageModel from '../../../models/product/StorageModel';

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
  const [itemProcessor, setItemProcessor] = useState<ProcessorModel>();
  const [itemMemory, setItemMemory] = useState<MemoryModel>();
  const [itemScreen, setitemScreen] = useState<ScreenModel>();
  const [itemStorage, setitemStorage] = useState<StorageModel>();
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
      border={'textInput'}
      type={'rowJustify90Screen'}
      disabled={isDisabled}
      paddingVertical={8}>
      <CustomImage
        marginBottom={0}
        source={props.data.productImageLink}
        preset={'productItem'}
      />
      <CustomView marginBottom={0} backgroundColor={'none'} preset={'left'}>
        <CustomText preset={'normalBold'} maxLines={2} marginBottom={0}>
          {props.data.productName}
        </CustomText>
        {
          itemProcessor ?
          <CustomText preset={'small'} marginBottom={2}>
          {itemProcessor.name }
        </CustomText>
          :<ActivityIndicator/>
        }
        
        {
          itemMemory ? 
          <CustomText preset={'small'} marginBottom={2}>
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
          <CustomText preset={'small'} marginBottom={2}>
          {itemStorage.type + ' ' + itemStorage.currentStorage }
        </CustomText>: <ActivityIndicator/>
        }
        {itemScreen?
        <CustomText preset={'small'} marginBottom={2}>
        {itemScreen.resolution + ' ' + itemScreen.screenSize}
      </CustomText> : <ActivityIndicator/>
        }

        <CustomView backgroundColor={'none'} preset={'rowJustify'}>
          <CustomText color={'err'} preset={'normalBold'} marginBottom={0}>
            {priceFormat(props.data.currentPrice)}
          </CustomText>

          {props.data.currentPrice != props.data.productPrice ? (
            <CustomText
            preset={'smallStrike'}
              color={'textVariant'}
              marginBottom={0}>
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

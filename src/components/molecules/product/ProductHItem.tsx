import {Animated, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CustomText from '../../atoms/CustomText';
import CustomImage from '../../atoms/CustomImage';
import CustomView from '../../atoms/CustomView';
import {
  deviceHeight,
  deviceWidth,
  discountFormat,
  priceFormat,
} from '../../../utils/helper';
import {MainContext} from '../../../screens/Main/MainContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../screens/Auth/AuthContext';
import MemoryModel from '../../../models/product/MemoryModel';
import ProcessorModel from '../../../models/product/ProcessorModel';
import ScreenModel from '../../../models/product/ScreenModel';
import StorageModel from '../../../models/product/StorageModel';
import CustomButtonBare from '../button/CustomButtonBare';

interface Props {
  data: any;
}

const ProductHItem = (props: Props) => {
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
  const [isDisabled, setIsDisabled] = useState(false);

  const {theme} = React.useContext(AuthContext);

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
    <CustomButtonBare disabled={isDisabled} onPress={onProductPressed}>
    <CustomView
      backgroundColor={'backgroundInput'}
      borderColor={'border'}
      border={'button'}
      styles={styles.container}>
      <CustomImage
        source={props.data.productImageLink}
        preset={'productItem'}
        marginBottom={12}
      />
      <CustomText maxLines={2} preset={'normalBold'}>
        {props.data.productName}
      </CustomText>

      {itemProcessor ? (
        <CustomText preset={'small'} marginBottom={4}>
          {itemProcessor.name}
        </CustomText>
      ) : (
        <ActivityIndicator />
      )}
      {itemMemory ? (
        <CustomText preset={'small'} marginBottom={4}>
          {itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed}
        </CustomText>
      ) : (
        <ActivityIndicator />
      )}

      {itemScreen ? (
        <CustomText preset={'small'} marginBottom={4}>
          {itemScreen.resolution + ' ' + itemScreen.screenSize}
        </CustomText>
      ) : (
        <ActivityIndicator />
      )}

      {itemStorage ? (
        <CustomText preset={'small'} marginBottom={4}>
          {itemStorage.type + ' ' + itemStorage.currentStorage}
        </CustomText>
      ) : (
        <ActivityIndicator />
      )}

      <CustomText color={'err'} preset={'normalBold'}>
        {priceFormat(props.data.currentPrice)}
      </CustomText>
      {props.data.currentPrice != props.data.productPrice ? (
        <CustomView
          backgroundColor={'none'}
          preset={'rowJustify'}
          marginBottom={12}
          styles={{gap:4}}>
          <CustomText
            preset={'smallStrike'}
            color={'textVariant'}
            marginBottom={0}>
            {priceFormat(props.data.productPrice)}
          </CustomText>
          <CustomText preset={'small'} color={'err'} marginBottom={0}>
            {discountFormat(props.data.onSale)}
          </CustomText>
        </CustomView>
      ) : (
        <></>
      )}
    </CustomView>
    </CustomButtonBare>
  );
};

export default ProductHItem;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.46,
    height:'auto',
    padding: 8,
    alignItems:'flex-start'
  },
});

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

interface Props{
  data: any
}

const ProductHItem = (props:Props) => {
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
  const [isDisabled, setIsDisabled] = useState(false);

  const {theme} = React.useContext(AuthContext);
  const colors = theme;

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

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadePress = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundInputColor,
          borderColor: colors.borderColor,
        },
        borderTheme.textInput,
      ]}
      disabled = {isDisabled}
      onPress={onProductPressed}
      onPressIn={fadePress}>
      <Animated.View
        style={{
          // Bind opacity to animated value
          opacity: fadeAnim,
        }}>
        <CustomImage
          source={props.data.productImageLink}
          linkType={'uri'}
          type={'productItem'}
        />
        <CustomText maxLines={2} textStyle={'text_normalBold'}>
          {props.data.productName}
        </CustomText>
        <CustomText textStyle={'text_small'} marginTop={4}>
          {itemProcessor ? itemProcessor.name : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'text_small'} marginTop={4}>
          {itemMemory ? itemMemory.currentRAM +
            ' ' +
            itemMemory.type +
            ' ' +
            itemMemory.speed : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'text_small'} marginTop={4}>
          {itemScreen
            ? itemScreen.resolution + ' ' + itemScreen.screenSize
            : <ActivityIndicator />}
        </CustomText>
        <CustomText textStyle={'text_small'} marginTop={4}>
          {itemStorage ? itemStorage.type + ' ' + itemStorage.currentStorage : <ActivityIndicator />}
        </CustomText>
        <CustomText textColor={'err'} textStyle={'text_normalBold'}>
          {priceFormat(props.data.currentPrice)}
        </CustomText>
        {props.data.currentPrice != props.data.productPrice ? (
          <CustomView
            backgroundColor={'transparent'}
            type={'rowJustify'}
            marginTop={4}>
            <CustomText
              textStyle={'text_smallStrike'}
              textColor={'textVariant'}
              marginTop={0}>
              {priceFormat(props.data.productPrice)}
            </CustomText>
            <CustomText textStyle={'text_small'} textColor={'err'} marginTop={0}>
              {discountFormat(props.data.onSale)}
            </CustomText>
          </CustomView>
        ) : (
          <></>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default ProductHItem;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.46,
    height: deviceHeight * 0.4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

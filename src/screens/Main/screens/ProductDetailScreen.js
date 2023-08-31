import {FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomText from '../../../components/atoms/CustomText';
import CustomButton from '../../../components/molecules/CustomButton';
import {priceFormat} from '../../../utils/helper';

const ProductDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {item, itemProcessor, itemMemory, itemScreen, itemStorage} =
    route.params;
  const {onGetUserByEmail, language} = useContext(AuthContext);


  const {
    onInsertCart,
    onGetProductImagesByProductID,
    onGetProductOS,
    onCheckUserFavorite,
    onGetUserFavorite,
  } = useContext(MainContext);

  const [prodImages, setProdImages] = useState([]);
  const [itemOS, setitemOS] = useState({});
  const [itemFavorite, setItemFavorite] = useState();
  const [user, setUser] = useState({});

  const getInitData = async () => {
    const prodImagesResult = await onGetProductImagesByProductID(
      item.productID,
    );
    setProdImages(prodImagesResult.data);

    const oss = await onGetProductOS(item.operatingSystemID);
    setitemOS(oss.data[0]);

    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    if (userInfo.response_code == 1) {
      setUser(userInfo.data);
    }
    const favoriteRes = await onGetUserFavorite(userInfo.data.userId);
    if (favoriteRes.response_code == 1) {
      const productID = item.productID;
      favoriteRes.data.map(item => {
        if (item.productID == productID) {
          setItemFavorite(item.isFavorite);
        }
      });
    }
  };

  const onAddToCartPressed = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    if (userInfo.response_code == 1) {
      const insertCartResult = await onInsertCart(
        1,
        userInfo.data.userId,
        item.productID,
      );
      if (insertCartResult.response_code == 1) {
        navigation.goBack();
      } else {
        console.log('Something wrong happen:', insertCartResult);
      }
    }
  };

  const onFavoritePressed = async () => {
    try {
      console.log('userId:', user.userId, 'productID:', item.productID);
      const favoriteResult = await onCheckUserFavorite(
        user.userId,
        item.productID,
      );
      console.log(favoriteResult);
      if (favoriteResult.response_code == 1) {
        setItemFavorite(!itemFavorite);
        console.log(itemFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUserReviewButtonPressed = () => {
    navigation.navigate('Product Comments', {productID: item.productID});
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <FlatList
          height={'100%'}
          width={240}
          marginTop={8}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'space-between', gap: 16}}
          style={{alignSelf: 'center'}}
          snapToAlignment="start"
          decelerationRate={'fast'}
          data={prodImages}
          initialNumToRender={3}
          keyExtractor={item => item.productImageID}
          renderItem={({item}) => {
            return (
              <CustomImage
                type={'productDetail'}
                source={item.productImageLink}
                linkType={'uri'}
              />
            );
          }}
        />
        <CustomView type={'rowJustify90'}>
          <CustomText textStyle={'titleBold'}>{item.productName}</CustomText>
          {itemFavorite ? (
            <CustomButton
              onPress={onFavoritePressed}
              type={'image'}
              source={images.ic_favorite_selected}
            />
          ) : (
            <CustomButton
              onPress={onFavoritePressed}
              type={'image'}
              source={images.ic_favorite}
            />
          )}
        </CustomView>
        <CustomView type={'right'}>
          <CustomText textColor={'err'} textStyle={'subtitleBold'}>
            {priceFormat(item.currentPrice)}
          </CustomText>
          {item.productPrice != item.currentPrice ? (
            <CustomText>{priceFormat(item.productPrice)}</CustomText>
          ) : (
            <></>
          )}
        </CustomView>
        {/* General info */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_general}
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_generalBrand}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.productName.split(' ')[0]}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_generalRating}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.totalRating}/5
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_generalModelCode}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.modelCode}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_generalManufac}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.manufacturer}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_generalWarranty}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.warranty + ' months'}
          </CustomText>
        </CustomView>

        {/* Dimensions and weight */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_dimension}
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_dimensionSize}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.length + ' x ' + item.width + ' x ' + item.height + ' mm'}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_dimensionWeight}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {item.weight}
          </CustomText>
        </CustomView>

        {/* Processor */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_processor}
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_processorName}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.name}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_processorSpeed}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.CPU_Speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_processorCores}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cores}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_processorLP}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.logicalProcessor}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_processorCache}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemProcessor.cacheMemory}
          </CustomText>
        </CustomView>

        {/* Memory */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_memory}
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_memoryRAM}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.currentRAM}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_memoryType}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_memorySpeed}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.speed}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_memoryASlots}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.availableSlots}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_memoryMaxRAM}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemMemory.maxRam}
          </CustomText>
        </CustomView>

        {/* Screen */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_screen}
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_screenSize}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemScreen.screenSize}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_screenRes}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemScreen.resolution}
          </CustomText>
        </CustomView>

        {/* Storage */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_storage}
        </CustomText>
        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_storageType}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_storageASlots}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.type}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_storageCur}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemStorage.currentStorage}
          </CustomText>
        </CustomView>

        {/* Operating System */}
        <CustomText
          textStyle={'subtitleBold'}
          alignSelf={'flex-start'}
          marginTop={20}>
          {language.productDetail_textHeader_os}
        </CustomText>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_osName}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.OS}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_osVersion}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.version}
          </CustomText>
        </CustomView>

        <CustomView type={'rowJustify90'}>
          <CustomText marginTop={4} hasFlex={true}>
            {language.productDetail_text_osType}
          </CustomText>
          <CustomText marginTop={4} hasFlex={true} textColor={'textVariant'}>
            {itemOS.type}
          </CustomText>
        </CustomView>

        <CustomButton
          onPress={onAddToCartPressed}
          type={'primary'}
          marginTop={32}>
          {language.productDetail_button_add}
        </CustomButton>

        <CustomButton
          onPress={onUserReviewButtonPressed}
          type={'primary'}
          backgroundColor={'warn'}
          marginTop={8}>
          {language.productDetail_button_review}
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};

export default ProductDetailScreen;

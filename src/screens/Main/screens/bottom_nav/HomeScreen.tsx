import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import CustomView from '../../../../components/atoms/CustomView';
import {MainContext} from '../../MainContext';
import ProductHItem from '../../../../components/molecules/product/ProductHItem';
import CustomText from '../../../../components/atoms/CustomText';
import {deviceWidth} from '../../../../utils/helper';
import CustomButton from '../../../../components/molecules/button/CustomButton';
import ProductVItem from '../../../../components/molecules/product/ProductVItem';
import * as images from '../../../../assets/images';
import CustomBanner from '../../../../components/molecules/product/CustomBanner';
import CustomButtonBare from '../../../../components/molecules/button/CustomButtonBare';
import {borderTheme} from '../../../../preferences/borderTheme';
import {AuthContext} from '../../../Auth/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [listProducts, setListProducts] = useState([]);
  const [listPopProducts, setListPopProducts] = useState([]);
  const [listBestBuy, setListBestBuy] = useState([]);
  const [maxItem, setMaxItem] = useState(6);
  const {onGetAllProduct} = useContext(MainContext);
  const {language} = useContext(AuthContext);

  const initData = async () => {
    const prosRes = await onGetAllProduct();
    console.log('Product data:', prosRes);
    setListProducts(prosRes);

    let myList = [...prosRes];
    myList = myList
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, maxItem);
    setListPopProducts(myList);
    console.log(myList);

    let bestBuy = [...prosRes];
    bestBuy = bestBuy
      .sort((a, b) => b.onSale.localeCompare(a.onSale))
      .slice(0, maxItem);
    setListBestBuy(bestBuy);

    
  };

  useEffect(() => {
    initData();
    
  }, []);

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <CustomButtonBare borderStyle={borderTheme.borderOnly} marginTop={24}>
          <CustomBanner
            source={images.banner}
            header={language.home_text_banner}
          />
        </CustomButtonBare>

        <CustomView type={'rowJustify90'} marginTop={48}>
          <CustomText textStyle={'normalBold'}>
            {language.home_text_popular}
          </CustomText>
          <CustomButton type={'tertiary'}>
            {language.home_text_see_more}
          </CustomButton>
        </CustomView>
        <FlatList
          width={deviceWidth * 0.9}
          horizontal={true}
          marginTop={12}
          contentContainerStyle={{
            gap: 16,
            flexGrow: 0,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          data={listPopProducts}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductHItem data={item} />;
          }}
        />

        <CustomView type={'rowJustify90'} marginTop={16}>
          <CustomText textStyle={'normalBold'}>
            {language.home_text_best_buy}
          </CustomText>
          <CustomButton type={'tertiary'}>
            {language.home_text_see_more}
          </CustomButton>
        </CustomView>

        <FlatList
          width={deviceWidth * 0.9}
          horizontal={true}
          marginTop={12}
          contentContainerStyle={{
            gap: 16,
            flexGrow: 0,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          data={listBestBuy}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductHItem data={item} />;
          }}
        />

        <CustomView type={'rowJustify90'} marginTop={16}>
          <CustomText textStyle={'normalBold'}>
            {language.home_text_likeable}
          </CustomText>
          <CustomButton type={'tertiary'}>
            {language.home_text_see_more}
          </CustomButton>
        </CustomView>

        <FlatList
          width={deviceWidth}
          marginTop={12}
          scrollEnabled={false}
          contentContainerStyle={{gap: 16, alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          data={listProducts.slice(0, maxItem)}
          initialNumToRender={3}
          keyExtractor={item => item.productID}
          renderItem={({item}) => {
            return <ProductVItem data={item} />;
          }}
        />
      </CustomView>
    </CustomView>
  );
};

export default HomeScreen;

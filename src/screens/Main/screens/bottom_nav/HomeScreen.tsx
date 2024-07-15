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
import {AuthContext} from '../../../Auth/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CustomScroll from '../../../../components/atoms/CustomScroll';
import TertiaryButton from '../../../../components/molecules/button/TertiaryButton';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [listProducts, setListProducts] = useState<Array<any>>([]);
  const [listPopProducts, setListPopProducts] = useState<Array<any>>([]);
  const [listBestBuy, setListBestBuy] = useState<Array<any>>([]);
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
      <CustomScroll main>
        <CustomButtonBare width={'100%'} border={'textInput'} marginBottom={48}>
          <CustomBanner
            source={images.banner}
            header={language.home_text_banner}
          />
        </CustomButtonBare>

        <CustomView preset={'rowJustifyFull'}>
          <CustomText preset={'normalBold'}>
            {language.home_text_popular}
          </CustomText>
          <TertiaryButton onPress={()=>{}} marginBottom={12}>{language.home_text_see_more}</TertiaryButton>
         
        </CustomView>
        <FlatList
          horizontal={true}
          style={{marginBottom:12}}
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

        <CustomView preset={'rowJustify90'} >
          <CustomText preset={'normalBold'}>
            {language.home_text_best_buy}
          </CustomText>
          <CustomButton preset={'tertiary'}>
            {language.home_text_see_more}
          </CustomButton>
        </CustomView>

        <FlatList
          horizontal={true}
          style={{marginBottom:16}}
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

        <CustomView preset={'rowJustify90'}>
          <CustomText preset={'normalBold'}>
            {language.home_text_likeable}
          </CustomText>
          <CustomButton preset={'tertiary'}>
            {language.home_text_see_more}
          </CustomButton>
        </CustomView>

        <FlatList
        style={{marginBottom:12}}
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
      </CustomScroll>
    </CustomView>
  );
};

export default HomeScreen;

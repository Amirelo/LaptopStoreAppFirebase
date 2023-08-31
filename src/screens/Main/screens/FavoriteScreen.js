import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import CustomView from '../../../components/atoms/CustomView';
import {AuthContext} from '../../Auth/AuthContext';
import {MainContext} from '../MainContext';
import ProductVItem from '../../../components/molecules/ProductVItem';

const FavoriteScreen = ({navigation}) => {
  const {onGetUserByEmail} = useContext(AuthContext);
  const {onGetUserFavorite, onGetProductByID} = useContext(MainContext);

  const [listFavorites, setListFavorites] = useState([]);

  const onItemPressed = item => {
    navigation.navigate('Product Details', {item: item});
  };

  const getInitData = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    const favoriteRes = await onGetUserFavorite(userInfo.data.userId);
    if (favoriteRes.response_code == 1) {
      favoriteRes.data.map(async item => {
        if (item.isFavorite != false) {
          const addRes = await onGetProductByID(item.productID);

          if (addRes.response_code == 1) {
            let prodItem = addRes.data[0];
            console.log(prodItem);
            setListFavorites(prevState => [...prevState, prodItem]);
          }
        }
      });
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <CustomView scrollable={true}>
      <FlatList
        width={'100%'}
        height={'100%'}
        style={{marginTop: 32}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          marginBottom: 16,
          alignItems: 'center',
        }}
        data={listFavorites}
        keyExtractor={item => item.productID}
        renderItem={({item}) => {
          return (
            <ProductVItem data={item} onPress={() => onItemPressed(item)} />
          );
        }}
      />
    </CustomView>
  );
};

export default FavoriteScreen;

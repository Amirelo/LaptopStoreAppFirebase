import {FlatList} from 'react-native';
import React from 'react';
import {CustomText, CustomView} from '../../../../components/atoms';
import ItemCard from '../../../../components/molecules/account/ItemCard';
import {deviceWidth} from '../../../../utils/helper';
import { RouteProp, useRoute } from '@react-navigation/native';

const CardScreen = () => {
  const route = useRoute<RouteProp<{params: {cards:any}}>>();
  const {cards} = route.params;
  console.log('Card screen', cards);

  return (
    <CustomView>
      {cards != null ? (
        <FlatList
          contentContainerStyle={{
            gap: 16,
            flexGrow: 0,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}
          data={cards}
          initialNumToRender={3}
          keyExtractor={item => item.cardID}
          renderItem={({item}) => {
            return <ItemCard data={item} />;
          }}
        />
      ) : (
        <CustomText>No card to show</CustomText>
      )}
    </CustomView>
  );
};

export default CardScreen;

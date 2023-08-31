import {FlatList} from 'react-native';
import React from 'react';
import OrderItem from '../../../components/molecules/OrderItem';
import CustomView from '../../../components/atoms/CustomView';

const OrderScreen = ({route}) => {
  const {userOrders, userAddresses} = route.params;

  return (
    <CustomView>
      <FlatList
        width={'100%'}
        height={'100%'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingVertical: 16,
          alignItems: 'center',
        }}
        data={userOrders}
        keyExtractor={item => item.userOrderID}
        renderItem={({item}) => {
          return <OrderItem item={item} address={userAddresses} />;
        }}
      />
    </CustomView>
  );
};

export default OrderScreen;

import {FlatList} from 'react-native';
import React, {useState} from 'react';
import AddressItem from '../../../components/molecules/AddressItem';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Auth/AuthContext';

const ShippingAddressScreen = ({route}) => {
  const navigation = useNavigation();
  let {userAddresses, userInfo} = route.params;
  const [addresses, setAddresses] = useState(userAddresses);
  const {language} = React.useContext(AuthContext);

  const onAddNewAddressPressed = () => {
    navigation.navigate('New Address', {
      userInfo: userInfo,
    });
  };

  const onEditAddressPressed = item => {
    navigation.navigate('New Address', {data: item, userInfo: userInfo});
  };

  return (
    <CustomView scrollable={true}>
      <CustomButton onPress={onAddNewAddressPressed} type={'primary'}>
        {language.address_button_insert}
      </CustomButton>
      <FlatList
        width={'100%'}
        height={'30%'}
        styles={{marginTop: 32}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          marginVertical: 16,
          alignItems: 'center',
        }}
        data={addresses}
        keyExtractor={item => item.addressID}
        renderItem={({item}) => {
          return (
            <AddressItem
              onEditPressed={() => onEditAddressPressed(item)}
              data={item}
            />
          );
        }}
      />
    </CustomView>
  );
};

export default ShippingAddressScreen;

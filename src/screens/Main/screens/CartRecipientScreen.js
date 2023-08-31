import React, {useContext, useEffect, useState} from 'react';
import * as images from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';
import LocationOptions from '../../../components/molecules/LocationOptions';

const CartRecipientScreen = ({navigation, route}) => {
  const [location, setLocation] = useState();
  const [showLocation, setShowLocation] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');
  const [userID, setUserID] = useState();

  const {onGetAddressesByEmail, onGetUserByEmail, language} =
    useContext(AuthContext);
  const {totalPrice, cart} = route.params;

  const initData = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    console.log(userInfo.data);
    setFullName(userInfo.data.fullname);
    setPhoneNumber(userInfo.data.phonenumber);
    setUserID(userInfo.data.userId);
    const userAddress = await onGetAddressesByEmail(email);
    setUserAddresses(userAddress.data);
    setLocation(userAddress.data[0]);
    console.log(userAddress.data);
  };

  const onContinueToCheckoutPressed = () => {
    navigation.navigate('Checkout', {
      location: location,
      fullName: fullName,
      phoneNumber: phoneNumber,
      totalPrice: totalPrice,
      note: note,
      userID: userID,
      cart: cart,
    });
  };

  const onLocationPressed = () => {
    setShowLocation(true);
  };

  const onHideLocationPressed = () => {
    setShowLocation(false);
  };

  const onLocationSelected = item => {
    setShowLocation(false);
    setLocation(item);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <CustomButton
        onPress={onLocationPressed}
        type={'social'}
        source={images.ic_arrow_down}
        marginTop={103}>
        {location
          ? location.addressName +
            ', ' +
            location.ward +
            ', ' +
            location.district +
            ', ' +
            location.city
          : 'Location'}
      </CustomButton>
      <CustomInput
        placeholder={language.placeholder_recipient}
        value={fullName}
        onChangeText={setFullName}
        marginTop={8}
        source={images.ic_contact}
      />
      <CustomInput
        placeholder={language.placeholder_phoneNumber}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        marginTop={8}
        source={images.ic_phone}
      />
      <CustomInput
        placeholder={language.placeholder_note}
        value={note}
        onChangeText={setNote}
        marginTop={8}
        source={images.ic_description}
      />
      <CustomButton
        type={'primary'}
        onPress={onContinueToCheckoutPressed}
        marginTop={24}>
        {language.cartRecipient_button_continue}
      </CustomButton>
      {showLocation ? (
        <LocationOptions
          data={userAddresses}
          onLocationSelected={onLocationSelected}
          onBackgroundPressed={onHideLocationPressed}
        />
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default CartRecipientScreen;

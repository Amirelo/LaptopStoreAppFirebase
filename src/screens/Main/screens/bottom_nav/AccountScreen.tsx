import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Auth/AuthContext';
import CustomView from '../../../../components/atoms/CustomView';
import AccountTab from '../../../../components/molecules/account/AccountTab';
import UserTab from '../../../../components/molecules/account/UserTab';
import CustomScroll from '../../../../components/atoms/CustomScroll';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const AccountScreen = () => {
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation<NavigationProp<any>>()
  const {
    onGetUserOrder,
    onSignOut,
    onGetUserCoupon,
    onGetUserCards,
    onGetUserByEmail,
    onGetAddressesByEmail,
    language,
  } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState({});
  const [userOrders, setUserOrders] = useState({});
  const [orderInProgress, setOrderInProgress] = useState(0);
  const [userPromoCodes, setUserPromoCodes] = useState({});
  const [userCards, setUserCards] = useState({});

  const getUserInfo = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    setUserData(userInfo);

    const userAddress = await onGetAddressesByEmail(email);
    setUserAddresses(userAddress);
    const userOrder = await onGetUserOrder(userInfo.userID);
    setUserOrders(userOrder);

    setOrderInProgress(0);
    userOrder.map(item => {
      if (item.status > 0 && item.status < 4) {
        setOrderInProgress(prev => prev + 1);
      }
    });

    const userCoupon = await onGetUserCoupon(userInfo.userID);
    setUserPromoCodes(userCoupon);

    const userCard = await onGetUserCards(userInfo.userID);
    setUserCards(userCard);
  };

  const onGoBackAccount = (data:any) => {
    setUserData(data);
  };

  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      getUserInfo();
    });
    return load;
  }, []);

  const onPressUserTab = () => {
    navigation.navigate('Profile', {
      userInfo: userData,
      onGoBackAccount: onGoBackAccount,
    });
  };

  const onShippingAddressPress = () => {
    navigation.navigate('Shipping Address', {
      userAddresses: userAddresses,
      userInfo: userData,
    });
  };

  const onMyOrderPressed = () => {
    navigation.navigate('User Order', {
      userInfo: userData,
      userOrders: userOrders,
      userAddresses: userAddresses,
    });
  };

  const onChangePasswordPressed = () => {
    navigation.navigate('Update User Information', {
      email: userData.email,
      type: 'PASSWORD',
    });
  };

  const onPromoCodesScreenPressed = () => {
    navigation.navigate('Promocodes', {
      userInfo: userData,
      userPromoCodes: userPromoCodes,
    });
  };

  const onSettingsPressed = () => {
    navigation.navigate('Settings');
  };

  // const onCardScreenPressed = () => {
  //   navigation.navigate('Card', {cards: userCards});
  // };

  const onSignOutPressed = () => {
    onSignOut();
  };

  return (
    <CustomView>
      <CustomScroll>
        <UserTab
          title={userData ? userData.username : ''}
          subtitle={userData ? userData.email : ''}
          source={userData ? userData.imageLink : ''}
          onPress={onPressUserTab}
        />
        <AccountTab
          title={language.account_tabHeader_myOrder}
          subtitle={orderInProgress + ' ' + language.account_tabSub_myOrder}
          onPress={onMyOrderPressed}
        />
        <AccountTab
          title={language.account_tabHeader_adderss}
          subtitle={
            userAddresses ? userAddresses.length + ' ' + language.account_tabSub_adderss : ''
          }
          onPress={onShippingAddressPress}
        />
        <AccountTab
          title={language.account_tabHeader_payment}
          subtitle={language.account_tabSub_payment}
          // onPress={onCardScreenPressed}
        />
        <AccountTab
          title={language.account_tabHeader_promo}
          subtitle={userPromoCodes.length + ' ' + language.account_tabSub_promo}
          onPress={onPromoCodesScreenPressed}
        />
        <AccountTab
          title={language.account_tabHeader_settings}
          subtitle={language.account_tabSub_settings}
          onPress={onSettingsPressed}
        />
        <AccountTab
          title={language.account_tabHeader_changePass}
          titleColor={'err'}
          subtitle={language.account_tabSub_changePass}
          onPress={onChangePasswordPressed}
        />
        <AccountTab
          title={language.account_tabHeader_logout}
          titleColor={'err'}
          subtitle={language.account_tabSub_logout}
          onPress={onSignOutPressed}
        />
      </CustomScroll>
    </CustomView>
  );
};

export default AccountScreen;

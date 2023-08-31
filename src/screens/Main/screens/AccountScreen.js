import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import AccountTab from '../../../components/molecules/AccountTab';

const AccountScreen = ({route, navigation}) => {
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
    setUserData(userInfo.data);

    const userAddress = await onGetAddressesByEmail(email);
    setUserAddresses(userAddress.data);
    const userOrder = await onGetUserOrder(userInfo.data.userId);
    setUserOrders(userOrder.data);

    setOrderInProgress(0);
    userOrder.data.map(item => {
      if (item.status > 0 && item.status < 4) {
        setOrderInProgress(prev => prev + 1);
      }
    });

    const userCoupon = await onGetUserCoupon(userInfo.data.userId);
    setUserPromoCodes(userCoupon.data);

    const userCard = await onGetUserCards(userInfo.data.userId);
    setUserCards(userCard.data);
  };

  const onGoBackAccount = data => {
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

  const onCardScreenPressed = () => {
    navigation.navigate('Card', {cards: userCards});
  };

  const onSignOutPressed = () => {
    onSignOut();
  };

  return (
    <CustomView>
      <CustomView scrollable={true}>
        <AccountTab
          title={userData ? userData.username : ''}
          subtitle={userData ? userData.email : ''}
          type={'usertab'}
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
            userAddresses.length + ' ' + language.account_tabSub_adderss
          }
          onPress={onShippingAddressPress}
        />
        <AccountTab
          title={language.account_tabHeader_payment}
          subtitle={language.account_tabSub_payment}
          onPress={onCardScreenPressed}
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
          isHighlight={true}
        />
        <AccountTab
          title={language.account_tabHeader_logout}
          titleColor={'err'}
          subtitle={language.account_tabSub_logout}
          onPress={onSignOutPressed}
          isHighlight={true}
        />
      </CustomView>
    </CustomView>
  );
};

export default AccountScreen;

import React, {useEffect, useState, useContext} from 'react';
import NotificationItem from '../../../components/molecules/NotificationItem';
import CustomView from '../../../components/atoms/CustomView';
import {FlatList} from 'react-native';
import {deviceWidth} from '../../../utils/helper';
import {AuthContext} from '../../Auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const [listNotification, setListNotification] = useState([]);
  const {onGetUserNotification, onGetUserByEmail} = useContext(AuthContext);

  const initData = async () => {
    let email = await AsyncStorage.getItem('email');
    let userRes = await onGetUserByEmail(email);
    if (userRes.response_code == 1) {
      let notiRes = await onGetUserNotification(userRes.data.userId);
      setListNotification(notiRes.data);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <FlatList
        width={deviceWidth * 0.9}
        marginTop={12}
        scrollEnabled={false}
        contentContainerStyle={{gap: 16, flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        data={listNotification}
        initialNumToRender={3}
        keyExtractor={item => item.notificationID}
        renderItem={({item}) => {
          return <NotificationItem data={item} />;
        }}
      />
    </CustomView>
  );
};

export default NotificationScreen;

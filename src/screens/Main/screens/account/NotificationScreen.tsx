import React, {useEffect, useState, useContext} from 'react';
import NotificationItem from '../../../../components/molecules/account/NotificationItem';
import CustomView from '../../../../components/atoms/CustomView';
import {FlatList} from 'react-native';
import {deviceWidth, displayMessage} from '../../../../utils/helper';
import {AuthContext} from '../../../Auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const [listNotification, setListNotification] = useState([]);
  const {onGetUserNotification, onGetUserByEmail,onUpdateUserNotificationStatus} = useContext(AuthContext);

  const initData = async () => {
    let email = await AsyncStorage.getItem('email');
    let userRes = await onGetUserByEmail(email);
    if (userRes != null) {
      console.log("User data: ", userRes)
      let notiRes = await onGetUserNotification(userRes.userID);
      setListNotification(notiRes);
    }
  };

  const onDeletePressed = async(notificationID) =>{
    const res = await onUpdateUserNotificationStatus(2,notificationID)
    if (res == true){
      displayMessage("Notification deleted")
      const updated = listNotification.filter(item => item.notificationID != notificationID)
      setListNotification(updated)
    }
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <FlatList
        width={deviceWidth * 0.9}
        marginTop={12}
        marginBottom={20}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 16, flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        data={listNotification.filter(item => item.status !=2)}
        initialNumToRender={1}
        keyExtractor={item => item.notificationID}
        renderItem={({item}) => {
          return <NotificationItem data={item} onDeletePressed={(id)=>onDeletePressed(id)} />;
        }}
      />
    </CustomView>
  );
};

export default NotificationScreen;

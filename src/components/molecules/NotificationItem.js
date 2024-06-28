import React, { useContext } from 'react';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../preferences/borderTheme';
import { Animated } from 'react-native';
import { AuthContext } from '../../screens/Auth/AuthContext';

const NotificationItem = ({data, onDeletePressed}) => {
  const anim = new Animated.Value(0);

  const {onUpdateUserNotificationStatus} = useContext(AuthContext)

  const fadeIn = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration:1000,
      useNativeDriver:true
    }).start()
  }

  const onReadPressed = async() =>{
    const res  = await onUpdateUserNotificationStatus(1, data.notificationID);
    if (res==true){
      data.status = 1
    }
  }

  React.useEffect(()=>{
    fadeIn()
  },[])

  return (
    <CustomView
      animated={true}
      backgroundColor={data.status ==1 ? 'none' : 'backgroundInput'}
      type={'tab'}
      customStyles={{opacity:anim}}
      borderStyle={borderTheme.textInput}>
      <CustomText textStyle={'normalBold'}>
        {data.title + ""}
      </CustomText>
      
      <CustomText textStyle={'normal'}>
        {data.detail + ""}
      </CustomText>
      <CustomView
        alignSelf={'flex-end'}
        backgroundColor={'transparent'}
        type={'row'}>
          {data.status != 1 ?
        <CustomButton onPress={onReadPressed} customStyles={{width:100, height: 36}} type={'primary'}>
          Mark as read
        </CustomButton>
        :<></>}
        <CustomButton  onPress={()=>onDeletePressed(data.notificationID)} customStyles={{marginHorizontal: 8, width:100, height: 36}} type={'primary'}>
          Delete
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};
export default NotificationItem;

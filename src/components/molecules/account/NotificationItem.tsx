import React, { useContext } from 'react';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
import CustomView from '../../atoms/CustomView';
import { Animated } from 'react-native';
import { AuthContext } from '../../../screens/Auth/AuthContext';
import NotificationModel from '../../../models/NotificationModel';

interface Props{
  data: NotificationModel,
  onDeletePressed(value:string|number):void,
}

const NotificationItem = (props: Props) => {
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
    const res  = await onUpdateUserNotificationStatus(1, props.data.id);
    if (res==true){
      props.data.status = 1
    }
  }

  React.useEffect(()=>{
    fadeIn()
  },[])

  return (
    <CustomView
      backgroundColor={props.data.status ==1 ? 'none' : 'backgroundInput'}
      preset={'tab'}
      styles={{opacity:anim}}
      border={'textInput'}>
      <CustomText preset={'normalBold'}>
        {props.data.title + ""}
      </CustomText>
      
      <CustomText preset={'normal'}>
        {props.data.detail + ""}
      </CustomText>
      <CustomView
        alignSelf={'flex-end'}
        backgroundColor={'none'}
        preset={'row'}>
          {props.data.status != 1 ?
        <CustomButton onPress={onReadPressed} customStyles={{width:100, height: 36}} type={'primary'}>
          Mark as read
        </CustomButton>
        :<></>}
        <CustomButton  onPress={()=>props.onDeletePressed(props.data.id)} customStyles={{marginHorizontal: 8, width:100, height: 36}} type={'primary'}>
          Delete
        </CustomButton>
      </CustomView>
    </CustomView>
  );
};
export default NotificationItem;

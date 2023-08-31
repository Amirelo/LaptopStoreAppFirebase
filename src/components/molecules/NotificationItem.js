import React from 'react';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

const NotificationItem = ({data}) => {
  return (
    <CustomView
      backgroundColor={'backgroundInput'}
      type={'tab'}
      borderStyle={borderTheme.textInput}>
      <CustomText textStyle={'normalBold'}>
        {data ? data.title : 'Title'}
      </CustomText>
      <CustomText textStyle={'normal'}>
        {data ? data.detail : 'detail'}
      </CustomText>
      <CustomView
        alignSelf={'flex-end'}
        backgroundColor={'transparent'}
        type={'row'}>
        {/* <CustomButton type={'tertiary'}>
          Mark as read
        </CustomButton>
        <CustomButton customStyles={{marginHorizontal: 8}} type={'tertiary'}>
          Delete
        </CustomButton> */}
      </CustomView>
    </CustomView>
  );
};
export default NotificationItem;

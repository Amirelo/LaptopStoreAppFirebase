import {View, Text} from 'react-native';
import React from 'react';
import {CustomText, CustomView} from '../atoms';
import {borderTheme} from '../../themes/borderTheme';

const CommentItem = ({data}) => {
  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText>{data.comment}</CustomText>
        <CustomText textColor={'warn'} textStyle={'subtitleBold'}>
          {data.rating}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default CommentItem;

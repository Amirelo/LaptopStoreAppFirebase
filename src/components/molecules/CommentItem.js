import React from 'react';
import {CustomText, CustomView} from '../atoms';
import {borderTheme} from '../../preferences/borderTheme';

const CommentItem = ({data}) => {
  console.log('data:', data)
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

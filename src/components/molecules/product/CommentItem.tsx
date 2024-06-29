import React from 'react';
import {CustomText, CustomView} from '../../atoms';
import {borderTheme} from '../../../preferences/borderTheme';

interface Props{
  data: CommentModel
}

const CommentItem = (props:Props) => {
  console.log('data:', props.data)
  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'none'} type={'rowJustify90'}>
        <CustomText>{props.data.comment}</CustomText>
        <CustomText textColor={'warn'} textStyle={'text_subtitleBold'}>
          {props.data.rating+""}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default CommentItem;

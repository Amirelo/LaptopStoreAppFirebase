import React from 'react';
import {CustomText, CustomView} from '../../atoms';

interface Props{
  data: CommentModel
}

const CommentItem = (props:Props) => {
  console.log('data:', props.data)
  return (
    <CustomView
      preset={'tab'}
      border={'textInput'}
      backgroundColor={'backgroundInput'}>
      <CustomView backgroundColor={'none'} preset={'rowJustify90'}>
        <CustomText>{props.data.comment}</CustomText>
        <CustomText color={'warn'} preset={'subtitleBold'}>
          {props.data.rating+""}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default CommentItem;

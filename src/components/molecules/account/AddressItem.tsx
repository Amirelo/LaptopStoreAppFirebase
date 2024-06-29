import React from 'react';
import CustomView from '../../atoms/CustomView';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
import {borderTheme} from '../../../preferences/borderTheme';
import {AuthContext} from '../../../screens/Auth/AuthContext';
import AddressModel from '../../../models/AddressModel';

interface Props{
  data: any,
  onEditPressed?(): void,
  onlyInfo?: boolean,
}

const AddressItem = (props:Props) => {
  console.log(props.data);
  const {language} = React.useContext(AuthContext);

  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText>
        {props.data.addressName +
          ', ' +
          props.data.ward +
          ', ' +
          props.data.district +
          ', ' +
          props.data.city}
      </CustomText>

      {props.onlyInfo ? (
        <CustomView backgroundColor={'none'}>
          <CustomText textStyle={'text_normalBold'}>{props.data.fullname +""}</CustomText>

          <CustomText>{props.data.phonenumber}</CustomText>
        </CustomView>
      ) : (
        <CustomView backgroundColor={'transparent'} type={'rowJustify90'}>
          <CustomView backgroundColor={'transparent'} type={'row'}>
            {props.data.status == 1 ? (
              <CustomText textStyle={'text_normalBold'}>
                {language.arr_status_address_1}
              </CustomText>
            ) : (
              <></>
            )}
          </CustomView>
          <CustomButton onPress={props.onEditPressed} type={'primarySmall'}>
            {language.insertAddress_button_update}
          </CustomButton>
        </CustomView>
      )}
    </CustomView>
  );
};

export default AddressItem;

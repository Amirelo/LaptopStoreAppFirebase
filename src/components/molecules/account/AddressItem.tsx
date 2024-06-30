import React from 'react';
import CustomView from '../../atoms/CustomView';
import CustomText from '../../atoms/CustomText';
import CustomButton from '../button/CustomButton';
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
      preset={'tab'}
      border={'textInput'}
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
          <CustomText preset={'normalBold'}>{props.data.fullname +""}</CustomText>

          <CustomText>{props.data.phonenumber}</CustomText>
        </CustomView>
      ) : (
        <CustomView backgroundColor={'none'} preset={'rowJustify90'}>
          <CustomView backgroundColor={'none'} preset={'row'}>
            {props.data.status == 1 ? (
              <CustomText preset={'normalBold'}>
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

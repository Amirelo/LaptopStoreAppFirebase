import React from 'react';
import CustomView from '../atoms/CustomView';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';
import {borderTheme} from '../../themes/borderTheme';
import {AuthContext} from '../../screens/Auth/AuthContext';

const AddressItem = ({data, onEditPressed, onlyInfo}) => {
  console.log(data);
  const {language} = React.useContext(AuthContext);

  return (
    <CustomView
      type={'tab'}
      borderStyle={borderTheme.textInput}
      backgroundColor={'backgroundInput'}>
      <CustomText>
        {data.addressName +
          ', ' +
          data.ward +
          ', ' +
          data.district +
          ', ' +
          data.city}
      </CustomText>

      {onlyInfo ? (
        <CustomView backgroundColor={'none'}>
          <CustomText textStyle={'normalBold'}>{data.fullname}</CustomText>

          <CustomText>{data.phonenumber}</CustomText>
        </CustomView>
      ) : (
        <CustomView backgroundColor={'transparent'} type={'rowJustify90'}>
          <CustomView backgroundColor={'transparent'} type={'row'}>
            {data.status == 1 ? (
              <CustomText textStyle={'normalBold'}>
                {language.arr_status_address_1}
              </CustomText>
            ) : (
              <></>
            )}
          </CustomView>
          <CustomButton onPress={onEditPressed} type={'primarySmall'}>
            {language.insertAddress_button_update}
          </CustomButton>
        </CustomView>
      )}
    </CustomView>
  );
};

export default AddressItem;

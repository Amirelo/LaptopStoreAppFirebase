import React, {useContext, useState} from 'react';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../../Auth/AuthContext';
import OptionsButton from '../../../components/molecules/OptionsButton';
import {CustomText} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';

const InsertAddressScreen = ({route}) => {
  const {userInfo} = route.params;
  let data = null;
  if (route.params.data) {
    console.log('found');
    data = route.params.data;
  }
  const {insertUserAddress, updateUserAddress, language} = useContext(AuthContext);
  const [addressName, setAddressName] = useState(data ? data.addressName : '');
  const [ward, setWard] = useState(data ? data.ward : '');
  const [district, setDistrict] = useState(data ? data.district : '');
  const [city, setCity] = useState(data ? data.city : '');
  const [status, setStatus] = useState(data ? data.status : 2);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showStatusOption, setShowStatusOption] = useState(false);
  const navigation = useNavigation();

  const addressStatusArr = [
    {status: language.arr_status_address_0, color: 'err'},
    {status: language.arr_status_address_1, color: 'primary'},
    {status: language.arr_status_address_2, color: 'text'},
  ];

  const insertAddress = async () => {
    let res = null;
    data
      ? (res = await updateUserAddress(
          status,
          'STATUS',
          data.addressID,
          userInfo.userId,
        ))
      : (res = await insertUserAddress(
          addressName,
          ward,
          district,
          city,
          status,
          userInfo.userId,
        ));
    console.log(res);
    if (res.response_code == 1) {
      navigation.navigate('Account');
    }
  };

  const onOptionSelected = index => {
    setStatus(index);
    setShowStatusOption(false);
  };

  return (
    <CustomView>
      <CustomInput
        disabled={!isDisabled}
        value={addressName}
        onChangeText={setAddressName}
        marginTop={32}
        placeholder={language.placeholder_addressName}
      />
      <CustomInput
        disabled={!isDisabled}
        value={ward}
        onChangeText={setWard}
        marginTop={8}
        placeholder={language.placeholder_ward}
      />
      <CustomInput
        disabled={!isDisabled}
        value={district}
        onChangeText={setDistrict}
        marginTop={8}
        placeholder={language.placeholder_district}
      />
      <CustomInput
        disabled={!isDisabled}
        value={city}
        onChangeText={setCity}
        marginTop={8}
        placeholder={language.placeholder_city}
      />
      <CustomButton
        disabled={isDisabled}
        onPress={setShowStatusOption}
        type={'social'}>
        {addressStatusArr[status].status}
      </CustomButton>
      <CustomButton
        disabled={isDisabled}
        onPress={insertAddress}
        type={'primary'}>
        {data
          ? language.insertAddress_button_update
          : language.insertAddress_button_insert}
      </CustomButton>

      {showStatusOption ? (
        <OptionsButton
          onBackgroundPressed={setShowStatusOption}
          itemChanged={status}>
          <CustomText textStyle={'subtitleBold'}>
            {language.arr_status_address_header}
          </CustomText>
          {addressStatusArr
            .filter((item, index) => {
              return index != 0;
            })
            .map((item, index) => {
              return (
                <CustomButton
                  disabled={isDisabled}
                  onPress={() => onOptionSelected(index + 1)}
                  type={'tertiary'}>
                  {item.status}
                </CustomButton>
              );
            })}
        </OptionsButton>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default InsertAddressScreen;

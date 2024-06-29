import React, { useContext, useState } from 'react';
import CustomView from '../../../../components/atoms/CustomView';
import CustomInput from '../../../../components/molecules/CustomInput';
import CustomButton from '../../../../components/molecules/button/CustomButton';
import { AuthContext } from '../../../Auth/AuthContext';
import OptionsButton from '../../../../components/molecules/OptionsButton';
import { CustomText } from '../../../../components/atoms';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AddressModel from '../../../../models/AddressModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InsertAddressScreen = () => {
  const route = useRoute<RouteProp<{params:{userInfo:any}}>>();
  const { userInfo } = route.params;
  const [data, setData] = React.useState()

  const {onGetUserByEmail} = useContext(AuthContext)

  const { insertUserAddress, updateUserAddress, language } = useContext(AuthContext);
  const [addressName, setAddressName] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState(2);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showStatusOption, setShowStatusOption] = useState(false);
  const navigation = useNavigation();

  const addressStatusArr = [
    { status: language.arr_status_address_0, color: 'err' },
    { status: language.arr_status_address_1, color: 'primary' },
    { status: language.arr_status_address_2, color: 'text' },
  ];

  const insertAddress = async () => {
    let email = await AsyncStorage.getItem('email');
    const userInfo = await onGetUserByEmail(email);
    address = new AddressModel(data ? data.addressID : -5, addressName,ward,district,city,status,userInfo.userID);
    let res = null;
    data
      ? (res = await updateUserAddress(
        address
      ))
      : (res = await insertUserAddress(
        address
      ));
    console.log(res);
    if (res == true) {
      navigation.navigate('Account');
    }
  };

  const onOptionSelected = (index:any) => {
    setStatus(index);
    setShowStatusOption(false);
  };

  React.useEffect(() => {
    if (route.params?.data) {
      console.log('found: ', route.params.data);
      setData(route.params.data)
      setAddressName(route.params.data.addressName)
      setWard(route.params.data.ward)
      setDistrict(route.params.data.district)
      setCity(route.params.data.city)
      setStatus(route.params.data.status)
    }
  }, [])

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

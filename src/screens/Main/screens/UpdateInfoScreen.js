import React, {useContext, useState} from 'react';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Auth/AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';

const UpdateInfoScreen = ({route, navigation}) => {
  const {email, type} = route.params;
  const [data, setData] = useState();
  const [confirmData, setConfirmData] = useState();
  const {language} = useContext(AuthContext);

  const languageText =
    type == 'PHONENUMBER' ? 'phoneNumber' : type.toLowerCase();

  const buttonText =
    language.updateInfo_text_change +
    ' ' +
    language[`placeholder_${languageText}`];

  let inputType = 'default';
  switch (type) {
    case 'PHONENUMBER':
      inputType = 'numeric';
  }

  const {onUpdateUserInfo} = useContext(AuthContext);

  const onChangeButtonPresses = async () => {
    if (type == 'PASSWORD') {
      if (data > 6 || data == confirmData) {
        const res = await onUpdateUserInfo(data, email, type);
        if (res.response_code == 1) {
          console.warn('Success');
          await AsyncStorage.setItem(type.toLowerCase(), data);
          navigation.navigate('Account');
        } else {
          console.warn('Fail');
          navigation.goBack();
        }
      } else {
        console.warn('Check your password info');
      }
    } else {
      const res = await onUpdateUserInfo(data, email, type);
      if (res.response_code == 1) {
        console.warn('Success');
        await AsyncStorage.setItem(type.toLowerCase(), data);
        route.params.onGoBack(data, type);
        navigation.goBack(null);
      } else {
        console.warn('Fail');
        navigation.goBack(null);
      }
    }
  };

  return (
    <CustomView>
      <CustomInput
        onChangeText={setData}
        placeholder={language[`placeholder_${languageText}`]}
        marginTop={103}
        keyboardType={inputType}
      />
      {type == 'PASSWORD' ? (
        <CustomInput
          onChangeText={setConfirmData}
          placeholder={language.placeholder_password_confirm}
          marginTop={8}
          keyboardType={inputType}
        />
      ) : (
        <></>
      )}
      <CustomButton
        onPress={onChangeButtonPresses}
        type={'primary'}
        marginTop={60}>
        {buttonText}
      </CustomButton>
    </CustomView>
  );
};

export default UpdateInfoScreen;

import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/CustomButton';

const SignUpScreen = ({navigation, route}) => {
  const {email, userData} = route.params;

  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthday, setBirthday] = useState();
  const [error, setError] = useState(false);

  const {onSignUp, onUpdateUserInfo, language} = useContext(AuthContext);

  const onConfirmPressed = async () => {
    checkInput();
    console.warn(error);
    if (!error) {
      console.warn('Sign up');
      let result = await onSignUp(
        username,
        password,
        email,
        phoneNumber,
        fullName,
        birthday,
      );
      console.warn(result);
      if (result.response_code == 1) {
        if (userData != null) {
          await onUpdateUserInfo(userData.picture, userData.email, 'source');
        }

        navigation.navigate('Sign In', {title: 'Sign Up success'});
      } else {
        navigation.navigate('Sign In', {title: 'Sign Up fail'});
      }
    }
  };

  const checkInput = () => {
    if (
      username == null ||
      password == null ||
      confirmPassword == null ||
      phoneNumber == null ||
      birthday == null ||
      password != confirmPassword
    ) {
      setError(true);
      return true;
    } else {
      setError(false);
      return false;
    }
  };

  return (
    <CustomView>
      <CustomInput
        source={images.ic_person}
        placeholder={language.placeholder_username}
        onChangeText={setUsername}
        marginTop={103}
      />
      <CustomInput
        source={images.ic_contact}
        placeholder={language.placeholder_fullname}
        value={fullName}
        onChangeText={setFullName}
        marginTop={8}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password}
        marginTop={8}
        onChangeText={setPassword}
        type={'password'}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password_confirm}
        marginTop={8}
        onChangeText={setConfirmPassword}
        type={'password'}
      />
      <CustomInput
        source={images.ic_phone}
        placeholder={language.placeholder_phoneNumber}
        keyboardType={'numeric'}
        onChangeText={setPhoneNumber}
        marginTop={8}
      />
      <CustomInput
        source={images.ic_calendar}
        placeholder={language.placeholder_birthday}
        onChangeText={setBirthday}
        marginTop={8}
      />

      <CustomButton type={'primary'} onPress={onConfirmPressed} marginTop={48}>
        {language.signUp_button_confirm}
      </CustomButton>
    </CustomView>
  );
};

export default SignUpScreen;

import React, { useContext, useState } from 'react';
import * as images from '../../../assets/images';
import { AuthContext } from '../AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/CustomButton';
import { CustomText } from '../../../components/atoms';
import { displayMessage } from '../../../utils/helper';

const SignUpScreen = ({ navigation, route }) => {
  const { email, userData } = route.params;

  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthday, setBirthday] = useState('');

  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false)

  const { onSignUp, onUpdateUserInfo, language, onCheckUsername } = useContext(AuthContext);

  const onConfirmPressed = async () => {
    isDisabled = true;
    let allowSignUp = checkInput();
    console.warn(error);
    if (error == '' && allowSignUp == true) {
      let result = await onSignUp(
        username,
        password,
        email,
        phoneNumber,
        fullName,
        birthday,
      )
      console.warn(result);
      if (result == true) {
        if (userData != null) {
          displayMessage("User Info updated")
          await onUpdateUserInfo(userData.picture, userData.email, 'IMAGE');
        }
        navigation.navigate('Sign In', { title: 'Sign Up success' });
      } else {
        navigation.navigate('Sign In', { title: 'Sign Up fail' });
      }
    } else{
      isDisabled = false;
    }
  };

  const checkInput = () => {
    let allowed = false;
    let checkUsername = onCheckUsername(username);
    if (checkUsername == true) {
      displayMessage("Username already in use")
      setError('Username already in use');
    }
    else if (
      username == null ||
      password == null ||
      confirmPassword == null ||
      phoneNumber == null ||
      birthday == null

    ) {
      displayMessage('Fields cannot be empty');
      setError('Fields cannot be empty');
    } else if (password != confirmPassword) {
      displayMessage('Passwords does not match')
      setError('Passwords does not match')
    }
    else {
      setError('');
      allowed = true;
    }
    return allowed;
  };

  return (
    <CustomView>
      <CustomInput
        source={images.ic_person}
        placeholder={language.placeholder_username}
        onChangeText={setUsername}
        marginTop={103}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_contact}
        placeholder={language.placeholder_fullname}
        value={fullName}
        onChangeText={setFullName}
        marginTop={8}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password}
        marginTop={8}
        onChangeText={setPassword}
        type={'password'}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password_confirm}
        marginTop={8}
        onChangeText={setConfirmPassword}
        type={'password'}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_phone}
        placeholder={language.placeholder_phoneNumber}
        keyboardType={'numeric'}
        onChangeText={setPhoneNumber}
        marginTop={8}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_calendar}
        value={birthday}
        placeholder={"YYYY-MM-dd"}
        onChangeText={(text)=>{
          console.log(text + ' ' + text.length)
          if(text.length == 4 && text.length > birthday.length){
            setBirthday(text+'-')
          } else if (text.length== 7 && text.length > birthday.length){
            setBirthday(text+'-')
          }else{
            setBirthday(text)
          }}}
        marginTop={8}
        disabled={!isDisabled}
      />

      <CustomText marginTop={4} textColor={'err'} textStyle={'small'} >{error}</CustomText>

      <CustomButton disabled={isDisabled} type={'primary'} onPress={onConfirmPressed} marginTop={48}>
        {language.signUp_button_confirm}
      </CustomButton>
    </CustomView>
  );
};

export default SignUpScreen;

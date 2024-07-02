import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import {displayMessage} from '../../../utils/helper';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from '../../../components/molecules/button/PrimaryButton';

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params: {email: String; userData: any}}>>();
  const {email, userData} = route.params;

  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);

  const {onSignUp, onUpdateUserInfo, language, onCheckUsername} =
    useContext(AuthContext);

  const onConfirmPressed = async () => {
    setIsDisabled(true);
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
      );
      console.warn(result);
      if (result == true) {
        if (userData != null) {
          displayMessage('User Info updated');
          await onUpdateUserInfo(userData.picture, userData.email, 'IMAGE');
        }
        navigation.navigate('Sign In', {title: 'Sign Up success'});
      } else {
        navigation.navigate('Sign In', {title: 'Sign Up fail'});
      }
    } else {
      setIsDisabled(false);
    }
  };

  const checkInput = () => {
    let allowed = false;
    let checkUsername = onCheckUsername(username);
    if (checkUsername == true) {
      displayMessage('Username already in use');
      setError('Username already in use');
    } else if (
      username == null ||
      password == null ||
      confirmPassword == null ||
      phoneNumber == null ||
      birthday == null
    ) {
      displayMessage('Fields cannot be empty');
      setError('Fields cannot be empty');
    } else if (password != confirmPassword) {
      displayMessage('Passwords does not match');
      setError('Passwords does not match');
    } else {
      setError('');
      allowed = true;
    }
    return allowed;
  };

  const onBirthdayUpdate = (text:string) => {
    if((text.length ==4 || text.length ==7) && birthday.length < text.length){
      text += '-'
    } 
    setBirthday(text)
  }

  return (
    <CustomView preset={'main'}>
      <CustomInput
        source={images.ic_person}
        placeholder={language.placeholder_username}
        onChangeText={setUsername}
        value={username}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_contact}
        placeholder={language.placeholder_fullname}
        value={fullName}
        onChangeText={setFullName}
        marginBottom={8}
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_password}
        value={password}
        placeholder={language.placeholder_password}
        marginBottom={8}
        onChangeText={setPassword}
        isPassword
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_password}
        value={confirmPassword}
        placeholder={language.placeholder_password_confirm}
        marginBottom={8}
        onChangeText={setConfirmPassword}
        isPassword
        disabled={!isDisabled}
      />
      <CustomInput
        source={images.ic_phone}
        value={phoneNumber}
        placeholder={language.placeholder_phoneNumber}
        keyboardType={'numeric'}
        onChangeText={setPhoneNumber}
        marginBottom={8}
        disabled={!isDisabled}
        maxLength={10}
      />
      <CustomInput
        source={images.ic_calendar}
        value={birthday}
        placeholder={'YYYY-MM-dd'}
        keyboardType={'numeric'}
        onChangeText={text => onBirthdayUpdate(text)}
        marginBottom={24}
        disabled={!isDisabled}
        maxLength={10}
      />

      <PrimaryButton disabled={isDisabled} onPress={onConfirmPressed}>
        {language.signUp_button_confirm}
      </PrimaryButton>
    </CustomView>
  );
};

export default SignUpScreen;

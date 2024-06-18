import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../../components/atoms/CustomText';
import CustomImage from '../../../components/atoms/CustomImage';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomButton from '../../../components/molecules/CustomButton';
import CustomInput from '../../../components/molecules/CustomInput';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {updateUserInfo} from '../AuthService';
import {checkLanguage, useLanguage} from '../../../themes/languageTheme';
import { displayMessage } from '../../../utils/helper';

const SignInScreen = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    onSignIn,
    onSignUp,
    checkSaveUser,
    onCheckEmail,
    onSocialSignIn,
    language,
  } = useContext(AuthContext);

  const onToForgotPasswordPress = () => {
    navigation.navigate('Verification', {paramKey: 'CHANGEPASSWORD'});
  };

  const onSignInPress = async () => {
    setIsDisabled(true);
    if (signInCheck() === true) {
      console.log(signInCheck());
      const result = await onSignIn(username, password);
      if (result != null && result.accountStatus !== 0) {
        setError('');
        await AsyncStorage.setItem('email', result.email);
        displayMessage("Login Successful")
      } else {
        displayMessage(language.err_signin_wrong)
        setError(language.err_signin_wrong);
      }
    }
    setIsDisabled(false);
  };

  const onSocialSignInPress = async email => {
    await AsyncStorage.setItem('email', email);
    onSocialSignIn();
  };

  const signInCheck = () => {
    var status = true
    if (username.length === 0 || password.length ===0){
      displayMessage(language.err_empty);
      setError(language.err_empty);
      status = false;
    }
    console.log("Status:" + status)
    return status;
  };

  const onToSignUpPress = () => {
    navigation.navigate('Verification', {paramKey: 'SIGNUP'});
  };

  const onGoogleSignInPressed = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await GoogleSignin.signOut();
      console.log(userInfo.user);
      const checkUser = await onCheckEmail(userInfo.user.email, 'SIGNUP');
      if (checkUser.response_code == 1) {
        const signUp = await onSignUp(
          userInfo.user.name,
          userInfo.user.id,
          userInfo.user.email,
          null,
          userInfo.user.name,
          null,
        );
        if (signUp.response_code == 1) {
          const updateImage = await updateUserInfo(
            userInfo.user.photo,
            userInfo.user.email,
            'IMAGELINK',
          );
          onSocialSignInPress(userInfo.user.email);
        }
      } else {
        onSocialSignInPress(userInfo.user.email);
      }
    } catch (error) {
      displayMessage("Error Signing In with Google")
      console.log(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '731408095021-7d46s8vh33cq91s9alb6v5j77vk9k3ug.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    checkSaveUser();
  }, []);

  return (
    <CustomView>
      <CustomImage type={'header'} source={images.app_logo_splash} />
      <CustomText textColor={'text'} textStyle={'subtitle'}>
        {language.login_text_header}
      </CustomText>
      <CustomText textColor={'text'} textStyle={'small'} marginTop={0}>
        {language.login_text_sub_header}
      </CustomText>

      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder={language.placeholder_username}
        source={images.ic_person}
        disabled={!isDisabled}
        marginTop={50}
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder={language.placeholder_password}
        source={images.ic_password}
        disabled={!isDisabled}
        marginTop={12}
        type={'password'}
      />
      {error ? (
        <CustomText marginTop={4} textColor={'err'} textStyle={'small'}>
          {error}
        </CustomText>
      ) : (
        <></>
      )}
      <CustomButton
        onPress={onToForgotPasswordPress}
        alignSelf={'flex-end'}
        type={'tertiary'}
        disabled={isDisabled}
        customStyles={{marginRight: '5%'}}>
        {language.login_button_forgot_password}
      </CustomButton>
      <CustomButton
        onPress={onSignInPress}
        type={'primary'}
        disabled={isDisabled}>
        {language.login_button_signin}
      </CustomButton>
      <CustomText marginTop={18}>
        {language.login_text_other_signin_option}
      </CustomText>
      <CustomButton
        onPress={onGoogleSignInPressed}
        type={'social'}
        source={images.ic_google}
        disabled={isDisabled}>
        {language.login_button_google_signin}
      </CustomButton>
      <CustomButton
        type={'tertiary'}
        onPress={onToSignUpPress}
        disabled={isDisabled}>
        <CustomView type={'row'} marginTop={24}>
          <CustomText marginTop={0}>
            {language.login_button_signup_1}{' '}
          </CustomText>
          <CustomText
            type={'highlight'}
            textColor={'primary'}
            textStyle={'normalBold'}
            marginTop={0}>
            {language.login_button_signup_2}
          </CustomText>
        </CustomView>
      </CustomButton>
    </CustomView>
  );
};

export default SignInScreen;

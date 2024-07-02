import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../../components/atoms/CustomText';
import CustomImage from '../../../components/atoms/CustomImage';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {displayMessage} from '../../../utils/helper';
import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import PrimaryButton from '../../../components/molecules/button/PrimaryButton';
import SocialButton from '../../../components/molecules/button/SocialButton';
import TertiaryButton from '../../../components/molecules/button/TertiaryButton';
import { TextInput, View } from 'react-native';

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [somethin, setSomethin] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const {onUpdateUserInfo} = React.useContext(AuthContext);

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
        // setError('');
        await AsyncStorage.setItem('email', result.email);
        displayMessage('Login Successful');
      } else {
        displayMessage(language.err_signin_wrong);
        // setError(language.err_signin_wrong);
      }
    }
    setIsDisabled(false);
  };

  const onSocialSignInPress = async (email: string) => {
    await AsyncStorage.setItem('email', email);
    onSocialSignIn();
  };

  const signInCheck = () => {
    var status = true;
    if (username.length === 0 || password.length === 0) {
      displayMessage(language.err_empty);
      // setError(language.err_empty);
      status = false;
    }
    console.log('Status:' + status);
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
          await onUpdateUserInfo(
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
      displayMessage('Error Signing In with Google');
      console.log(error);
    }
  };

  const onAnonymousSignIn = async () => {
    onSocialSignIn();
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
      {/* Header */}
      <CustomImage
        preset={'header'}
        source={images.app_logo_splash}
        marginBottom={12}
      />
      <CustomText marginBottom={2} color={'text'} preset={'subtitle'}>
        {language.login_text_header}
      </CustomText>
      <CustomText color={'text'} preset={'small'} marginBottom={50}>
        {language.login_text_sub_header}
      </CustomText>

      {/* Input */}
      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder={language.placeholder_username}
        source={images.ic_person}
        disabled={!isDisabled}
        marginBottom={8}
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder={language.placeholder_password}
        source={images.ic_password}
        disabled={!isDisabled}
        marginBottom={16}
        isPassword
      />


      {/* Button */}
      <TertiaryButton
        alignSelf="flex-end"
        onPress={onToForgotPasswordPress}
        disabled={isDisabled}
        marginBottom={16}
        underline>
        {language.login_button_forgot_password}
      </TertiaryButton>

      <PrimaryButton
        onPress={onSignInPress}
        disabled={isDisabled}
        marginbottom={18}>
        {language.login_button_signin}
      </PrimaryButton>

      <CustomText marginBottom={16}>
        {language.login_text_other_signin_option}
      </CustomText>

      <SocialButton onPress={onAnonymousSignIn} disabled={isDisabled}>
        Guest
      </SocialButton>
      <SocialButton
        source={images.ic_google}
        onPress={onGoogleSignInPressed}
        disabled={isDisabled}>
        Google
      </SocialButton>

      <TertiaryButton onPress={onToSignUpPress} disabled={isDisabled}>
        <CustomView preset="row">
          <CustomText marginBottom={0}>
            {language.login_button_signup_1 + ' '}
          </CustomText>
          <CustomText marginBottom={0} color={'primary'} preset={'normalBold'}>
            {language.login_button_signup_2}
          </CustomText>
        </CustomView>
      </TertiaryButton>

     
    </CustomView>
  );
};

export default SignInScreen;

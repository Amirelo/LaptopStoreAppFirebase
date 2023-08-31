import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../AuthContext';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomText from '../../../components/atoms/CustomText';
import {textTheme} from '../../../themes/textTheme';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomView from '../../../components/atoms/CustomView';

const VerificationScreen = ({navigation, route}) => {
  const [email, setEmail] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [receivedCode, setReceivedCode] = useState();
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const {onSendVerificationCode, onCheckEmail, language} =
    useContext(AuthContext);
  const {paramKey} = route.params;

  const onSendPressed = async () => {
    setIsDisabled(true);
    let checkEmailResult = await onCheckEmail(email, paramKey);

    if (checkEmailResult.response_code == 1) {
      setError('');
      let result2 = await onSendVerificationCode(email);
      setReceivedCode(result2.data);
      if (result2.response_code == 1) {
        setTimer(60);
        myTimer();
        setTimeout(() => {
          setReceivedCode();
        }, 60000);
      } else {
        setError(result2.message);
      }
    } else {
      setError(checkEmailResult.message);
    }
    setIsDisabled(false);
  };

  const myTimer = () => {
    setTimeout(() => {
      setTimer(prev => prev - 1);
      if (timer > 0) {
        myTimer();
      }
    }, 1000);
  };

  const onVerifyPress = () => {
    if (verificationCode == receivedCode) {
      setVerificationCode();
      switch (paramKey) {
        case 'CHANGEPASSWORD':
          navigation.navigate('Forgot Password', {
            email: email,
            type: 'PASSWORD',
          });
          break;
        case 'SIGNUP':
          navigation.navigate('Sign Up', {email: email});
          break;
        default:
          setError(language.err_nav);
      }
    } else {
      setError(language.err_verify_code);
    }
  };

  const onSignInHerePressed = () => {
    navigation.navigate('Sign In');
  };

  return (
    <>
      {receivedCode == null ? (
        <CustomView>
          <CustomInput
            source={images.ic_email}
            placeholder={language.placeholder_email}
            marginTop={103}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
            disabled={!isDisabled}
          />
          <CustomText
            textColor={'text'}
            textStyle={textTheme.text_normal}
            marginTop={8}>
            {language.verify_text_description}
          </CustomText>
          {error != null ? (
            <CustomText textColor={'err'} textStyle={'normal'}>
              {error}
            </CustomText>
          ) : (
            <></>
          )}
          <CustomButton
            type={'primary'}
            onPress={onSendPressed}
            disabled={isDisabled}
            marginTop={40}>
            {language.verify_button_send}
          </CustomButton>
          <CustomButton
            type={'tertiary'}
            onPress={onSignInHerePressed}
            disabled={isDisabled}>
            <CustomView type={'row'} marginTop={24}>
              <CustomText marginTop={0}>
                {language.verify_button_signin_1}
              </CustomText>
              <CustomText
                type={'highlight'}
                textColor={'primary'}
                textStyle={'normalBold'}
                marginTop={0}>
                {language.verify_button_signin_2}
              </CustomText>
            </CustomView>
          </CustomButton>
        </CustomView>
      ) : (
        <CustomView>
          <CustomInput
            source={images.ic_verification}
            placeholder={language.placeholder_verify}
            keyboardType={'numeric'}
            marginTop={103}
            disabled={!isDisabled}
            onChangeText={setVerificationCode}
          />
          <CustomImage source={images.ic_timer} type={'logo'} marginTop={32} />
          <CustomText textStyle={'subtitleBold'} marginTop={12}>
            {language.verify_text_code_description}
          </CustomText>
          <CustomText textStyle={'header'} marginTop={12}>
            {timer}
          </CustomText>
          <CustomButton
            type={'tertiary'}
            marginTop={52}
            alignSelf={'flex-end'}
            disabled={isDisabled}
            customStyles={{marginEnd: '5%'}}
            onPress={onSendPressed}>
            {language.verify_button_resend}
          </CustomButton>
          <CustomButton
            onPress={onVerifyPress}
            type={'primary'}
            disabled={isDisabled}
            marginTop={16}>
            {language.verify_button_verify}
          </CustomButton>
        </CustomView>
      )}
    </>
  );
};

export default VerificationScreen;

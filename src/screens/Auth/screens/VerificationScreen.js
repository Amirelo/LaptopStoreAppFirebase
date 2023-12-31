import React, { useContext, useState } from 'react';
import * as images from '../../../assets/images';
import CustomButton from '../../../components/molecules/CustomButton';
import { AuthContext } from '../AuthContext';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomText from '../../../components/atoms/CustomText';
import { textTheme } from '../../../themes/textTheme';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomView from '../../../components/atoms/CustomView';

const VerificationScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const { onCheckEmail, language } =
    useContext(AuthContext);
  const { paramKey } = route.params;

  const onSendPressed = async () => {
    setIsDisabled(true);
    let checkEmailResult = await onCheckEmail(email, paramKey);

    if (checkEmailResult == true) {
      if (paramKey == 'CHANGEPASSWORD') {
        navigation.navigate('Forgot Password', { email: email, type: 'PASSWORD' });
      } else {
        setError('Email not found');
      }
    } else if (checkEmailResult == false) {
      if (paramKey == 'SIGNUP') {
        navigation.navigate('Sign Up', { email: email });
      } else {
        setError('Email already registered');
      }
    }

    setIsDisabled(false);
  };

  const onSignInHerePressed = () => {
    navigation.navigate('Sign In');
  };

  return (

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
      {paramKey != 'CHANGEPASSWORD' ?
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
        : <></>}
    </CustomView>

  );
};

export default VerificationScreen;

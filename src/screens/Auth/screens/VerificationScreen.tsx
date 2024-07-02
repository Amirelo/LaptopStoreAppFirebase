import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import CustomButton from '../../../components/molecules/button/CustomButton';
import {AuthContext} from '../AuthContext';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomText from '../../../components/atoms/CustomText';
import CustomView from '../../../components/atoms/CustomView';
import {displayMessage, testEmailFormat} from '../../../utils/helper';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from '../../../components/molecules/button/PrimaryButton';
import TertiaryButton from '../../../components/molecules/button/TertiaryButton';

const VerificationScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params: {paramKey: any}}>>();
  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);

  const {onCheckEmail, language} = useContext(AuthContext);
  const {paramKey} = route.params;

  const onSendPressed = async () => {
    setIsDisabled(true);
    if (email.length != 0 && testEmailFormat(email) == true) {
      let checkEmailResult = await onCheckEmail(email);
      console.log('Check email result: ' + checkEmailResult);
      if (checkEmailResult == true) {
        if (paramKey == 'CHANGEPASSWORD') {
          navigation.navigate('Forgot Password', {
            email: email,
            type: 'PASSWORD',
          });
        } else {
          displayMessage('Email already registered');
          // setError('Email already registered');
        }
      } else if (checkEmailResult == false) {
        if (paramKey == 'SIGNUP') {
          navigation.navigate('Sign Up', {email: email});
        } else {
          displayMessage('Email not found');
          // setError('Email not found');
        }
      }
    } else {
      displayMessage('Fields cannot be empty');
    }

    setIsDisabled(false);
  };

  const onSignInHerePressed = () => {
    navigation.navigate('Sign In');
  };

  return (
    <CustomView preset={'main'}>
      <CustomInput
        source={images.ic_email}
        placeholder={language.placeholder_email}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
        disabled={!isDisabled}
      />
      <CustomText marginBottom={40}>
        {language.verify_text_description}
      </CustomText>

      <PrimaryButton onPress={onSendPressed} disabled={isDisabled}>
        {language.verify_button_send}
      </PrimaryButton>
      {paramKey != 'CHANGEPASSWORD' ? (
        <TertiaryButton
        onPress={onSignInHerePressed}
        disabled={isDisabled}>
          <CustomView preset='row'>
           <CustomText marginBottom={0}>
               {language.verify_button_signin_1 + ' '}
             </CustomText>
             <CustomText
               color={'primary'}
               preset={'normalBold'}
               marginBottom={0}>
               {language.verify_button_signin_2}
             </CustomText>
             </CustomView>
          </TertiaryButton>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default VerificationScreen;

import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import CustomView from '../../../components/atoms/CustomView';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomText from '../../../components/atoms/CustomText';
import CustomButton from '../../../components/molecules/CustomButton';

const ForgotPasswordScreen = ({navigation, route}) => {
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [error, setError] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const {email, type} = route.params;

  const {onUpdateUserInfo, language} = useContext(AuthContext);

  const onConfirmPress = async () => {
    setIsDisabled(true);
    if (pass == null) {
      setError('Fields cannot be empty');
    } else if (pass.length < 6) {
      setError('Must have > 6 characters');
    } else if (pass != confirmPass) {
      setError('Passwords does not match');
    }
    if (pass == confirmPass && pass != null) {
      let result = await onUpdateUserInfo(pass, email, type);
      if (result.response_code == 1) {
        navigation.navigate('Sign In', {title: 'Change password success'});
      }
    }
    setIsDisabled(false);
  };

  return (
    <CustomView>
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password}
        marginTop={103}
        onChangeText={setPass}
        disabled={!isDisabled}
        type={'password'}
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password_confirm}
        onChangeText={setConfirmPass}
        disabled={!isDisabled}
        marginTop={8}
        type={'password'}
      />
      {error != null ? (
        <CustomText textStyle={'normal'} textColor={'err'}>
          {error}
        </CustomText>
      ) : (
        <></>
      )}
      <CustomButton
        onPress={onConfirmPress}
        type={'primary'}
        disabled={isDisabled}
        marginTop={24}>
        {language.changePass_button_confirm}
      </CustomButton>
    </CustomView>
  );
};

export default ForgotPasswordScreen;

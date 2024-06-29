import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import { CustomView, CustomText } from '../../../components/atoms';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/button/CustomButton';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params:{email:String, type:String}}>>();

  const [pass, setPass] = React.useState<String>('');
  const [confirmPass, setConfirmPass] = useState<String>('');
  const [error, setError] = useState('');
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
      if (result == true) {
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
        isPassword
      />
      <CustomInput
        source={images.ic_password}
        placeholder={language.placeholder_password_confirm}
        onChangeText={setConfirmPass}
        disabled={!isDisabled}
        marginTop={8}
        isPassword
      />
      {error != null ? (
        <CustomText textStyle={'text_normal'} textColor={'err'}>
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

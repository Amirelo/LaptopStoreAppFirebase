import React, {useContext, useState} from 'react';
import * as images from '../../../assets/images';
import {AuthContext} from '../AuthContext';
import {CustomView, CustomText} from '../../../components/atoms';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomButton from '../../../components/molecules/button/CustomButton';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import PrimaryButton from '../../../components/molecules/button/PrimaryButton';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<{params: {email: string; type: string}}>>();

  const [pass, setPass] = React.useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false);
  const {email, type} = route.params;

  const {onUpdateUserInfo, language} = useContext(AuthContext);

  const onConfirmPress = async () => {
    setIsDisabled(true);
    if (pass == null) {
      // setError('Fields cannot be empty');
    } else if (pass.length < 6) {
      // setError('Must have > 6 characters');
    } else if (pass != confirmPass) {
      // setError('Passwords does not match');
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
    <CustomView preset="main">
      <CustomInput
        value={pass}
        source={images.ic_password}
        placeholder={language.placeholder_password}
        onChangeText={setPass}
        disabled={!isDisabled}
        obscure
      />
      <CustomInput
        source={images.ic_password}
        value={confirmPass}
        placeholder={language.placeholder_password_confirm}
        onChangeText={setConfirmPass}
        disabled={!isDisabled}
        marginBottom={24}
        obscure
      />

      <PrimaryButton onPress={onConfirmPress} disabled={isDisabled}>
        {language.changePass_button_confirm}
      </PrimaryButton>
    </CustomView>
  );
};

export default ForgotPasswordScreen;

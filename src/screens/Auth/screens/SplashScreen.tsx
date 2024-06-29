import React, {useContext} from 'react';
import * as images from '../../../assets/images';
import CustomView from '../../../components/atoms/CustomView';
import CustomImage from '../../../components/atoms/CustomImage';
import CustomText from '../../../components/atoms/CustomText';
import {deviceHeight} from '../../../utils/helper';
import {AuthContext} from '../AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {language} = useContext(AuthContext);
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Sign In'}],
    });
  }, 2000);
  return (
    <CustomView backgroundColor={'primary'}>
      <CustomImage
        source={images.app_logo_splash}
        marginTop={deviceHeight * 0.4}
        type={'header'}
      />
      <CustomText
        textStyle={'text_titleBold'}
        textColor={'textConstrast'}
        marginTop={20}>
        {language.splash_text_motto}
      </CustomText>
    </CustomView>
  );
};

export default SplashScreen;
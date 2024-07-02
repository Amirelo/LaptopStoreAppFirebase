import React, {createContext, useEffect} from 'react';
import {
  checkEmail,
  signIn,
  signUp,
  updateUserFullname,
  updateUserPhoneNumber,
  updateUserBirthday,
  updateUserPassword,
  getUserOrders,
  getUserOrderDetail,
  getUserCoupon,
  getUserCards,
  getAddressesByEmail,
  getUserByEmail,
  getUserNotification,
  updateNotificationStatus,
  insertNotification,
  insertAddress,
  updateAddressInfo,
  updateUserImage,
  checkUserName,
} from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkLanguage, languageTheme} from '../../preferences/languages/languageTheme';
import {setThemeColors} from '../../preferences/themes/colorTheme';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const AuthContext = createContext({} as any);

interface Props{
  children: any
}

GoogleSignin.configure({
  webClientId:
    '731408095021-7d46s8vh33cq91s9alb6v5j77vk9k3ug.apps.googleusercontent.com',
  offlineAccess: true,
});

export const AuthContextProvider = (props:Props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [language, setLanguage] = React.useState(checkLanguage('en'));
  const [theme, setTheme] = React.useState(setThemeColors());

  const changeLanguage = async (lang:keyof typeof languageTheme) => {
    setLanguage(checkLanguage(lang));
    await AsyncStorage.setItem('language', lang);
  };

  const changeTheme = async (themeType: keyof typeof theme) => {
    setTheme(setThemeColors(themeType));
    await AsyncStorage.setItem('theme', themeType);
  };

  const checkSaveUser = async () => {
    try {
      let email = await AsyncStorage.getItem('email');
      email != null ? setIsLoggedIn(true) : {};
    } catch (error) {
      console.warn('On check save user error', error);
    }
  };

  const onGoogleSignIn = () => {
    setIsLoggedIn(true);
  };

  const onSignIn = async (username:string, password:string) => {
    try {
      const res = await signIn(username, password);
      console.log('On Sign In Result: ', res);
      if (res != null) {
        setIsLoggedIn(true);
        return res;
      } else {
        return res;
      }
    } catch (error) {
      console.log('On sign In error', error);
      return false;
    }
  };

  const onSocialSignIn = () => {
    setIsLoggedIn(true);
  };

  const onSignUp = async (
    username:String,
    password:String,
    email:String,
    phoneNumber:String,
    fullName:String,
    birthday:String,
  ) => {
    try {
      const res = await signUp(
        username,
        password,
        email,
        phoneNumber,
        fullName,
        birthday,
      );
      return res;
    } catch (error) {
      console.log('On Sign Up error', error);
      return null;
    }
  };

  const onSignOut = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };



  const onCheckEmail = async (email:string) => {
    try {
      
      var res = await checkEmail(email);
      console.log('On Check Email success', res);
      return res;
    } catch (error) {
      console.log('On Check Email error', error);
      return null;
    }
  };

  const onCheckUsername = async(username:String)=>{
    try{
      return await checkUserName(username);
    } catch(error){
      console.log('On Check Username error:', error);
    }
    
  }

  const onUpdateUserInfo = async (data:string, email:string, type:string) => {
    try {
      let res;
      switch(type){
        case 'FULLNAME':
          res = await updateUserFullname(data, email);
          break;
        case 'PHONENUMBER':
          res = await updateUserPhoneNumber(data, email);
          break;
        case 'BIRTHDAY':
          res =await updateUserBirthday(data, email);
          break;
        case 'PASSWORD':
          res = await updateUserPassword(data, email);
          break;
        case 'IMAGE':
          res = await updateUserImage(data, email);
          break;
      }
      console.log('On Update User Info success', res);
      return res;
    } catch (error) {
      console.log('On Update User Info error', error);
      return null;
    }
  };

  const onGetUserByEmail = async (email:string) => {
    try {
      const res = await getUserByEmail(email);
      console.log('On Get User info success', res);
      return res;
    } catch (error) {
      console.log('On Get User info error', error);
      return null;
    }
  };

  const onGetAddressesByEmail = async (email:string) => {
    try {
      const res = await getAddressesByEmail(email);
      console.log('On Get User Address success', res);
      return res;
    } catch (error) {
      console.log('On Get User Address error', error);
      return null;
    }
  };

  const insertUserAddress = async (
    address:any
  ) => {
    try {
      const res = await insertAddress(
        address
      );
      console.log('On Insert User Address success', res);
      return res;
    } catch (error) {
      console.log('On Insert User Address error', error);
      return null;
    }
  };

  const updateUserAddress = async (address:any) => {
    try {
      
      const res = await updateAddressInfo(address);
      console.log('On Update User Address success', res);
      return res;
    } catch (error) {
      console.log('On Update User Address error', error);
      return null;
    }
  };

  const onGetUserNotification = async (userID:any) => {
    try {
      const res = await getUserNotification(userID);
      console.log('On Get User Notification success', res);
      return res;
    } catch (error) {
      console.log('On Get User Notification error', error);
      return null;
    }
  };

  const onUpdateUserNotificationStatus = async (
    status:number,
    notificationID:any,
  ) => {
    try {
      const res = await updateNotificationStatus(
        status,
        notificationID,
      );
      console.log('On Update User Notification success', res);
      return true;
    } catch (error) {
      console.log('On Update User Notification error', error);
      return false;
    }
  };

  const onInsertNotification = async (title:string, detail:string, userID:string|number) => {
    try {
      const res = await insertNotification(title, detail, userID);
      console.log('On Get User Notification success', res);
      return res;
    } catch (error) {
      console.log('On Get User Notification error', error);
      return null;
    }
  };

  const onGetUserOrder = async (userID:any) => {
    try {
      const res = await getUserOrders(userID);
      console.log('On Get User Order success', res);
      return res;
    } catch (error) {
      console.log('On Get User Order error', error);
      return null;
    }
  };

  const onGetUserOrderDetail = async (orderID:any) => {
    try {
      const res = await getUserOrderDetail(orderID);
      console.log('On Get Order Detail success', res);
      return res;
    } catch (error) {
      console.log('On Get Order Detail error', error);
      return null;
    }
  };

  const onGetUserCoupon = async (userID:any) => {
    try {
      const res = await getUserCoupon(userID);
      console.log('On Get user coupon success', res);
      return res;
    } catch (error) {
      console.log('On Get user coupon error', error);
      return null;
    }
  };

  const onGetUserCards = async (userID:any) => {
    try {
      const res = await getUserCards(userID);
      console.log('On Get user coupon success', res);
      return res;
    } catch (error) {
      console.log('On Get user coupon error', error);
      return null;
    }
  };

  const getCurLanguage = async () => {
    const langKey = await AsyncStorage.getItem('language');
    console.log('key', langKey);
    setLanguage(checkLanguage(langKey));
  };

  const getCurTheme = async () => {
    const themeType = await AsyncStorage.getItem('theme');
    console.log('theme type', themeType);
    setTheme(setThemeColors(themeType));
    console.log('theme', theme);
  };

  useEffect(() => {
    getCurLanguage();
    getCurTheme();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onSignIn,
        onSignUp,
        onSignOut,
        onUpdateUserInfo,
        insertUserAddress,
        updateUserAddress,
        onCheckEmail,
        onCheckUsername,
        checkSaveUser,
        onGetUserNotification,
        onUpdateUserNotificationStatus,
        onInsertNotification,
        onGetUserOrder,
        onGetUserOrderDetail,
        onGetUserCoupon,
        onGetUserCards,
        onGoogleSignIn,
        onGetUserByEmail,
        onGetAddressesByEmail,
        onSocialSignIn,
        language,
        changeLanguage,
        theme,
        changeTheme,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

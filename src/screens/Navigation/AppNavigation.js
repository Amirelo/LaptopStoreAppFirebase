import React, {useContext} from 'react';
import AuthNavigation from '../Auth/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../Auth/AuthContext';
import MainNavigation from '../Main/MainNavigation';

const AppNavigation = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;

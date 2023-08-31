import React from 'react';
import SignInScreen from './screens/SignInScreen';
import VerificationScreen from './screens/VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import {AuthContext} from './AuthContext';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const {language, theme} = React.useContext(AuthContext);

  const customHeaderStyle = {
    backgroundColor: theme.borderColor,
    elevation: 10,
    shadowColor: theme.primaryColor,
  };
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        options={{headerShown: false}}
        component={SplashScreen}
      />
      <Stack.Screen
        name="Sign In"
        options={{headerShown: false}}
        component={SignInScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_verification,
          headerStyle: customHeaderStyle,
        }}
        name="Verification"
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_changePassword,
          headerStyle: customHeaderStyle,
        }}
        name="Forgot Password"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_signUp,
          headerStyle: customHeaderStyle,
        }}
        name="Sign Up"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthContextProvider} from './src/screens/Auth/AuthContext';
import AppNavigation from './src/screens/Navigation/AppNavigation';
import {MainContextProvider} from './src/screens/Main/MainContext';

function App() {
  return (
    <AuthContextProvider>
      <MainContextProvider>
        <AppNavigation />
      </MainContextProvider>
    </AuthContextProvider>
  );
}

export default App;

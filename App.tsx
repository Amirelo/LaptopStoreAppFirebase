import {AuthContextProvider} from './src/screens/Auth/AuthContext';
import {MainContextProvider} from './src/screens/Main/MainContext';
import AppNavigation from './src/screens/Navigation/AppNavigation';

export default function App(): React.JSX.Element {
  return (
    <AuthContextProvider>
      <MainContextProvider>
        <AppNavigation />
      </MainContextProvider>
    </AuthContextProvider>
  );
}

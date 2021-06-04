import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/contexts/auth';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) { return <AppLoading />; }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

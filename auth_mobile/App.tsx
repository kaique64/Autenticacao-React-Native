import 'react-native-gesture-handler';
import React from 'react';
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold, 
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold, 
    Montserrat_700Bold
  });  

  if (!fontsLoaded) 
    return <AppLoading />;

  return (
    <Routes />
  );
}

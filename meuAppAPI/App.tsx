import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import AppStack from './navigations/AppStack';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E3350D',
    secondary: '#F5D547',
    surface: '#FFF',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

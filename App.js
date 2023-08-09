import React from 'react';
import { StyleSheet } from 'react-native'; // To add styles
import MainNavigator from './src/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }


const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

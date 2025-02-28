import '../gesture-handler.native';
import React from 'react'
import { StyleSheet, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './presentation/routes/StackNavigation';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation/>
      

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  logo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomColor: '#E6E9F1',
    borderBottomWidth: 2,
    padding: 20
  },
});

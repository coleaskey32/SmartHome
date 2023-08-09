import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import FloodDescription from './FloodDescription';


// Create the stack navigator
const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Description" component={FloodDescription} />
      </Stack.Navigator>
    );
  };


  export default MainNavigator;
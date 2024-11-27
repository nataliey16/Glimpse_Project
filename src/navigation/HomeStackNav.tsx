import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AppLayout from '../layout/AppLayout';

const HomeStack = createNativeStackNavigator();

function HomeStackNav(): React.JSX.Element {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Your Home" component={Home}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeStackNav;

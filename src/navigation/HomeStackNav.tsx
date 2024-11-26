import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';

const HomeStack = createNativeStackNavigator();

function HomeStackNav(): React.JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Your Home" component={Home}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeStackNav;

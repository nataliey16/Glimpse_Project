import React from 'react';
import {} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNav from './HomeStackNav';
import ProfileStackNav from './ProfileStackNav';
import SearchStackNav from './SearchStackNav';
import CreateBoardStackNav from './CreateBoardStackNav';

const NestedNav = createBottomTabNavigator();

function NestedNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <NestedNav.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <NestedNav.Screen
          name="Home"
          component={HomeStackNav}></NestedNav.Screen>
        <NestedNav.Screen
          name="Search"
          component={SearchStackNav}></NestedNav.Screen>
        <NestedNav.Screen
          name="Create Board"
          component={CreateBoardStackNav}></NestedNav.Screen>
        <NestedNav.Screen
          name="Profile"
          component={ProfileStackNav}></NestedNav.Screen>
      </NestedNav.Navigator>
    </NavigationContainer>
  );
}

export default NestedNavigation;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';

const SearchStack = createNativeStackNavigator();

function SearchStackNav(): React.JSX.Element {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen
        name="Your Search"
        component={SearchScreen}></SearchStack.Screen>
    </SearchStack.Navigator>
  );
}

export default SearchStackNav;

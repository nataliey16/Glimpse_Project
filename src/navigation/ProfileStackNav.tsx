import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';

const ProfileStack = createNativeStackNavigator();

function ProfileStackNav(): React.JSX.Element {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Your Profile"
        component={Profile}></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNav;

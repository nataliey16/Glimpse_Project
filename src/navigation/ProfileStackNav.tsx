import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import UpdateBoard from '../screens/UpdateBoard';
import BoardDetails from '../screens/BoardDetails';
import CreateBoard from '../screens/CreateBoard';

const ProfileStack = createNativeStackNavigator();

function ProfileStackNav(): React.JSX.Element {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false, // Hides the header for all screens
      }}>
      <ProfileStack.Screen name="MyProfile" component={Profile} />
      <ProfileStack.Screen name="BoardDetails" component={BoardDetails} />
      <ProfileStack.Screen name="CreateBoard" component={CreateBoard} />
      <ProfileStack.Screen
        name="UpdateBoard"
        component={UpdateBoard}
        options={{
          presentation: 'modal',
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNav;

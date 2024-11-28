import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNav from './HomeStackNav';
import ProfileStackNav from './ProfileStackNav';
import SearchStackNav from './SearchStackNav';
import CreateBoardStackNav from './CreateBoardStackNav';
import TabIcon from '../components/TabIcon';

const NestedNav = createBottomTabNavigator();

function NestedNavigation(): React.JSX.Element {
  return (
    <View style={styles.tabView}>
      <NavigationContainer>
        <NestedNav.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({
              focused,
              color,
              size,
            }: {
              focused: boolean;
              color: string;
              size: number;
            }) => {
              return (
                <TabIcon
                  route={route.name}
                  focused={focused}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarStyle: styles.tabBarStyle,
            tabBarShowLabel: false, // Hides the tab labels
            headerShown: false,
            tabBarActiveTintColor: '#C3CFFA',
          })}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#3A3B45',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default NestedNavigation;

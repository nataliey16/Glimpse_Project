import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

type TabIconParams = {
  route: string;
  focused: boolean;
  color: string;
};

function TabIcon(params: TabIconParams): React.JSX.Element {
  const routeName = params.route;
  const isFocused = params.focused;
  const tintColor = params.color;

  return (
    <View
      style={[
        style.iconView,
        {
          borderWidth: 1,
          borderColor: isFocused ? tintColor : '#3A3B45',
        },
      ]}>
      <Image
        style={style.iconImg}
        source={
          routeName === 'Home'
            ? require('../assets/icons/home.png')
            : routeName === 'Search'
            ? require('../assets/icons/search.png')
            : routeName === 'Create Board'
            ? require('../assets/icons/create.png')
            : routeName === 'Profile'
            ? require('../assets/icons/profile.png')
            : null
        }
        alt="Tab Icon"></Image>
    </View>
  );
}

const style = StyleSheet.create({
  iconView: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  iconImg: {
    resizeMode: 'contain',
  },
});
export default TabIcon;

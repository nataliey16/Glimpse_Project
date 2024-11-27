import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Header(): React.JSX.Element {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTxt}>GLIMPSE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3CFFA',
    padding: 10,
  },

  headerTxt: {
    fontSize: 50,
    fontWeight: '500',
    fontFamily: 'montserrat',
    color: '#fff',
    textShadowColor: '#9694FF',
    textShadowOffset: {width: 1, height: 5},
    textShadowRadius: 10,
    borderColor: '#C3CFFA',
  },
});

export default Header;

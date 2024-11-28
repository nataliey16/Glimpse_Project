import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

function Footer(): React.JSX.Element {
  return (
    <View style={style.footerView}>
      <Text style={style.footerTxt}>Powered by Pexels API</Text>
    </View>
  );
}

const style = StyleSheet.create({
  footerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3CFFA',
    padding: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },

  footerTxt: {
    fontSize: 10,
    fontWeight: '100',
    fontFamily: 'montserrat',
    color: '#fff',
  },
});

export default Footer;

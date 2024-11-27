import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Header(): React.JSX.Element {
  return (
    <View style={styles.headerView}>
      <Text>Glimpse</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppLayout from '../layout/AppLayout';
import {CommonStyles} from '../utils/CommonStyles';

function Home({navigation}: {navigation: any}): React.JSX.Element {
  return (
    <AppLayout>
      <View style={CommonStyles.screens}>
        <Text>Home</Text>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#C3CFFA',
    flex: 1,
  },
});

export default Home;

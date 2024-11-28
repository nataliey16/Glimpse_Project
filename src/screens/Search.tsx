import React from 'react';
import {Text, View} from 'react-native';
import AppLayout from '../layout/AppLayout';

function SearchScreen({navigation}: {navigation: any}): React.JSX.Element {
  return (
    <AppLayout>
      <View>
        <Text>SearchScreen</Text>
      </View>
    </AppLayout>
  );
}

export default SearchScreen;

import React, {Children} from 'react';
import {View, Text} from 'react-native';
import Header from '../Main';

type AppLayoutParamsType = {
  children: React.JSX.Element;
};

function AppLayout(params: AppLayoutParamsType): React.JSX.Element {
  const {children} = params;
  return (
    <View>
      <View>
        <Text>Hello</Text>
      </View>
      <View>
        <Text>{children}</Text>
      </View>
      <View>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

export default AppLayout;

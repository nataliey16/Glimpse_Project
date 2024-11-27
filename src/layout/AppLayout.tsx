import React, {Children} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

type AppLayoutParamsType = {
  children: React.JSX.Element;
};

function AppLayout(params: AppLayoutParamsType): React.JSX.Element {
  const {children} = params;
  return (
    <View>
      <Header />
      <View>
        <Text style={style.txtFont}>{children}</Text>
      </View>
      <View>
        <Text>Footer</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  txtFont: {
    fontFamily: 'montserrat',
  },
});

export default AppLayout;

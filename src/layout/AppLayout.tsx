import React, {Children} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

type AppLayoutParamsType = {
  children: React.JSX.Element;
};

function AppLayout(params: AppLayoutParamsType): React.JSX.Element {
  const {children} = params;
  return (
    <View style={{flex: 1}}>
      <Header />
      <View>
        <Text style={style.txtFont}>{children}</Text>
      </View>
      <Footer />
    </View>
  );
}

const style = StyleSheet.create({
  txtFont: {
    fontFamily: 'montserrat',
  },
});

export default AppLayout;

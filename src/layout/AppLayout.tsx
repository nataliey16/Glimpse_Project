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
    <View style={styles.container}>
      {/* Persistent Header */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Page Content */}
      <View style={styles.contentContainer}>{children}</View>

      {/* Persistent Footer (Optional) */}
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#C3CFFA',
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    backgroundColor: '#C3CFFA',
  },

  headerText: {
    fontSize: 30,
    fontWeight: '200',
  },
});

export default AppLayout;

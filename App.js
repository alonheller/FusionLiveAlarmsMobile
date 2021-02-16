import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Login from './components/Login';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Login />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;

import React, { useState} from 'react';
import { View,Text, StyleSheet } from 'react-native';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

const Dashboard: () => React$Node = () => {
  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text>DASHBOARD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
  });

export default Dashboard;

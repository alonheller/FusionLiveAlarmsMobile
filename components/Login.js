import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Login: () => React$Node = (props) => {
	const [user, setUser] = useState('admin');
	const [password, setPassword] = useState('admin');
	const [server, setServer] = useState('http://192.168.1.140:10200');

  return (	
		<View style={styles.body}>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>User</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => setUser(text)}
					value={user}/>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Password</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => setPassword(text)}
					value={password}/>
			</View>

      <View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Server</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => setServer(text)}
					value={server}/>
			</View>

			<View style={styles.sectionContainer}>
			<Button
        title="LOGIN"
        onPress={() => props.loginHandler(props.history)}
        disabled={user === '' || password === '' || server === ''}
      />
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default Login;

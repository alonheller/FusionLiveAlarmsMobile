import React, { useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
	TextInput,
  StatusBar,
	Button,
	Alert,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Login: () => React$Node = () => {
	const [user, setUser] = useState('admin');
	const [password, setPassword] = useState('admin');

	const onLoginClicked = () => {
		if (user !== '' && password !== '') {
			Alert.alert('HaHA');
		} else {
			Alert.alert('Credentials empty');
		}
	}

  return (
		<>
		<View style={styles.body}>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>User:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => setUser(text)}
					value={user}/>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Password:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={text => setPassword(text)}
					value={password}/>
			</View>

			<View style={styles.sectionContainer}>
			<Button
        title="LOGIN"
        onPress={() => onLoginClicked()}
      />
			</View>

		</View>
		</>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Login;

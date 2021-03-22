import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

import AuthContext from '../context/auth';
import { USER_KEY, PASSWORD_KEY, SERVER_KEY } from '../utils/constants';

const Login: () => React$Node = (props) => {
	const history = useHistory();
	const { isAuthorized, setIsAuthorized, server, setServer } = useContext(AuthContext);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		getCredentials = async () => {
			const user = await AsyncStorage.getItem(USER_KEY);
			const password = await AsyncStorage.getItem(PASSWORD_KEY);
			const server = await AsyncStorage.getItem(SERVER_KEY);

			user !== null && setUser(user);
			password !== null && setPassword(password);
			user !== null && setServer(server);
			setInitialized(true);
		};

		getCredentials();
	}, []);

	useEffect(() => {
		if (initialized && user !== '' && password !== '' && server !== '') {
			login();
		}
	}, [initialized]);

	const login = async () => {
		setIsLoading(true);
		setIsAuthorized(false);
		const body = {
			Action: 'Login',
			Parameters: {
				username: user,
				password: password,
				rememberMe: false
			}
		};

		const options = {
			url: server,
			method: 'post',
			data: body,
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'ecs/json',
				Action: 'Login'
			},
			withCredentials: true
		};
		try {
			const response = await axios(options);

			const accountStatus = response?.data?.ReturnValue?.AccountStatus;
			const dropPassValidation = response?.data?.ReturnValue?.DropPassValidation;
			const PassPattern = response?.data?.ReturnValue?.PassPattern;
			const ticket = response?.data?.ReturnValue?.Ticket;
			const userId = response?.data?.ReturnValue?.UserID;

			setIsLoading(false);
			if (accountStatus === 3 && response.status === 200) {
				storeData(USER_KEY, user);
				storeData(PASSWORD_KEY, password);
				storeData(SERVER_KEY, server);
				setIsAuthorized(true);
				history.push('/dashboard');
			} else {
				Alert.alert('Error on login');
			}
		} catch (err) {
			setIsLoading(false);
			if (err?.message === 'Request failed with status code 401') {
				Alert.alert('Wrong User or Password');
			} else {
				Alert.alert('Server is down');
			}
		}
	};

	const storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.log(`error saving key: ${key}`);
		}
	};

	const onLoginClicked = () => {
		login();
	};

	return (
		<View style={styles.body}>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>User</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(text) => setUser(text)}
					value={user}
					editable={!isLoading}
				/>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Password</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					editable={!isLoading}
				/>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionTitle}>Server</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onChangeText={(text) => setServer(text)}
					value={server}
					editable={!isLoading}
				/>
			</View>

			<View style={styles.sectionContainer}>
				<Button
					title='LOGIN'
					onPress={() => onLoginClicked()}
					disabled={user === '' || password === '' || server === '' || isLoading}
				/>
				{isLoading && <ActivityIndicator />}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: Colors.white
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black
	}
});

export default Login;

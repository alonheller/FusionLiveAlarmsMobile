import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import AuthContext from '../context/auth';
import axios from 'axios';
import { USER_KEY, PASSWORD_KEY, SERVER_KEY } from '../utils/constants';

const Settings: () => React$Node = () => {
	const history = useHistory();
	const { setServer } = useContext(AuthContext);

	const onLogout = async () => {
		storeData(USER_KEY, '');
		storeData(PASSWORD_KEY, '');
		storeData(SERVER_KEY, '');
		setServer('');
		history.push('/');
	};

	const onCancel = () => {
		history.push('/dashboard');
	};

	const storeData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.log(`error saving key: ${key}`);
		}
	};

	return (
		<View>
			<Text>SETTINGS</Text>
			<Button
				icon={<Icon name='logout' size={15} color='white' />}
				title='Logout'
				onPress={onLogout}
			/>
			<Button
				icon={<Icon name='cancel' size={15} color='white' />}
				title='Cancel'
				onPress={onCancel}
			/>
			<Button icon={<Icon name='save' size={15} color='white' />} title='Save' onPress={onCancel} />
		</View>
	);
};

export default Settings;

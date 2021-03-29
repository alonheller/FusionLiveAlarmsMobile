import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import axios from 'axios';

import { USER_KEY, PASSWORD_KEY, SERVER_KEY } from '../utils/constants';
import AuthContext from '../context/auth';
import SettingsContext from '../context/settings';
import AuthenticatedUserContext from '../context/authenticatedUser';

const Settings: () => React$Node = () => {
	const history = useHistory();
	const { setServer } = useContext(AuthContext);
	const {
		userId,
		setUserId,
		locationTagList,
		setLocationTagList,
		assetTagList,
		setAssetTagList,
		configMode,
		setConfigMode,
		hierarchyNav,
		setHierarchyNav,
		refreshInterval,
		setRefreshInterval,
		autoRefresh,
		setAutoRefresh,
		configDrawerMode,
		setConfigDrawerMode,
		darkMode,
		setDarkMode
	} = useContext(SettingsContext);
	const { authenticatedUser, setAuthenticatedUser } = useContext(AuthenticatedUserContext);

	const onLogout = async () => {
		storeData(USER_KEY, '');
		storeData(PASSWORD_KEY, '');
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

	const saveSettings = async () => {
		// get current Settings
		// getoverride
		// save
		/* 
		
		
    UserID?: number;
    LocationTagList?: Array<string>;
    AssetTagList?: Array<string>;
    ConfigMode: boolean;
    HierarchyNav: boolean;
    RefreshInterval: number;
    AutoRefresh: boolean;
    ConfigDrawerMode: number;
    DarkMode: boolean;*/
	};

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View>
			<Text>SETTINGS</Text>

			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor='#3e3e3e'
				onValueChange={toggleSwitch}
				value={authenticatedUser.ShowWarnings}
			/>

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

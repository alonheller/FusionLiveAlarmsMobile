import React, { useState, useContext, useEffect } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Header } from 'react-native-elements';
import { useHistory } from 'react-router-native';
import axios from 'axios';

import { USER_KEY, PASSWORD_KEY, SERVER_KEY } from '../utils/constants';
import AuthContext from '../context/auth';
import SettingsContext from '../context/settings';
import AuthenticatedUserContext from '../context/authenticatedUser';
import generateApiObject from '../utils/api';

const Settings: () => React$Node = () => {
	const history = useHistory();

	const { server, setServer } = useContext(AuthContext);
	const { settings, setSettings } = useContext(SettingsContext);
	const { authenticatedUser, setAuthenticatedUser } = useContext(AuthenticatedUserContext);

	const [loading, setLoading] = useState(false);
	const [showWarnings, setShowWarnings] = useState(authenticatedUser.ShowWarnings);
	const [darkMode, setDarkMode] = useState(true); // TODO: should come from server

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

	const onSaveSettings = async () => {
		setLoading(true);
		const settingsToSave = Object.create(null);
		settingsToSave.userSettings = Object.create(null);
		settingsToSave.userSettings.AssetTagList = settings.AssetTagList; // TODO: Override
		settingsToSave.userSettings.AutoRefresh = settings.AutoRefresh;
		settingsToSave.userSettings.ConfigDrawerMode = settings.ConfigDrawerMode;
		settingsToSave.userSettings.ConfigMode = settings.ConfigMode;
		settingsToSave.userSettings.DarkMode = settings.DarkMode; // TODO: Override
		settingsToSave.userSettings.HierarchyNav = settings.HierarchyNav;
		settingsToSave.userSettings.LocationTagList = settings.LocationTagList; // TODO: Override
		settingsToSave.userSettings.RefreshInterval = settings.RefreshInterval;

		const preferencesToSave = Object.create(null);
		preferencesToSave.firstName = authenticatedUser.FirstName;
		preferencesToSave.middleName = authenticatedUser.MiddleName;
		preferencesToSave.lastName = authenticatedUser.LastName;
		preferencesToSave.captionemail = authenticatedUser.Email;
		preferencesToSave.email2 = authenticatedUser.Email2;
		preferencesToSave.email3 = authenticatedUser.Email3;
		preferencesToSave.zoneName = authenticatedUser.ZoneName;
		preferencesToSave.showWarnings = showWarnings; // override
		preferencesToSave.locale = authenticatedUser.Locale;

		const axiosOptionsSettings = axios(
			generateApiObject(server, 'SaveUserSettings', settingsToSave)
		);
		const axiosOptionsPreferences = axios(
			generateApiObject(server, 'SavePreferences', preferencesToSave)
		);

		try {
			const responses = await axios.all([axiosOptionsSettings, axiosOptionsPreferences]);
			setSettings(settingsToSave);
			setAuthenticatedUser(preferencesToSave);
		} catch (err) {
			console.log(err);
			Alert.alert('Error on save settings');
		} finally {
			setLoading(false);
			history.push('/dashboard');
		}
	};

	return (
		<SafeAreaView style={StyleSheet.container}>
			<Header
				centerComponent={{ text: 'SETTINGS', style: { color: '#fff' } }}
				containerStyle={{
					backgroundColor: '#292D39'
				}}
			/>

			<View style={styles.row}>
				<Icon name='settings' size={35} color='white' style={styles.icon} />
				<Text style={styles.caption}>Show Warnings</Text>
				<View style={styles.component}>
					<Switch
						ios_backgroundColor='#3e3e3e'
						onValueChange={() => setShowWarnings(!showWarnings)}
						value={showWarnings}
						style={{ marginRight: 15 }}
					/>
				</View>
			</View>

			<View style={styles.row}>
				<Icon name='settings' size={35} color='white' style={styles.icon} />
				<Text style={styles.caption}>Dark Mode</Text>
				<View style={styles.component}>
					<Switch
						ios_backgroundColor='#3e3e3e'
						onValueChange={() => setDarkMode(!darkMode)}
						value={darkMode}
						style={{ marginRight: 15 }}
					/>
				</View>
			</View>

			<Button
				icon={<Icon name='logout' size={15} color='white' />}
				title='Logout'
				onPress={onLogout}
			/>

			<View style={styles.row}>
				<Button
					icon={<Icon name='cancel' size={15} color='white' />}
					title='Cancel'
					onPress={onCancel}
				/>
				<Button
					icon={<Icon name='save' size={15} color='white' />}
					title='Save'
					onPress={onSaveSettings}
				/>
				{/* {loading && <ActivityIndicator size="large"/>} */}
				{<ActivityIndicator size='large' />}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		height: 60,
		marginTop: 15,
		alignItems: 'center',
		backgroundColor: '#292D39'
	},
	caption: {
		color: '#ECEFF1',
		fontSize: 20,
		fontWeight: '600'
	},
	icon: {
		paddingLeft: 10,
		paddingRight: 10
	},
	component: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }
});

export default Settings;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
	TouchableHighlight,
	View,
	Text,
	Button,
	Alert,
	ScrollView,
	RefreshControl,
	FlatList,
	SafeAreaView,
	StyleSheet
} from 'react-native';
import axios from 'axios';

import AuthContext from '../context/auth';
import SettingsContext from '../context/settings';
import AuthenticatedUserContext from '../context/authenticatedUser';
import generateApiObject from '../utils/api';
import SummaryInfo from './SummaryInfo';
import Header from './Header';
import AlarmListItem from './AlarmListItem';
import { parseAlarms } from '../utils/alarms';

const Dashboard: () => React$Node = () => {
	const { server } = useContext(AuthContext);
	const { setSettings } = useContext(SettingsContext);
	const { authenticatedUser, setAuthenticatedUser } = useContext(AuthenticatedUserContext);

	const [loading, setLoading] = useState(false);
	const [userLocations, setUserLocations] = useState();
	const [userLocationsTags, setUserLocationsTags] = useState();
	const [prerequisitesInitialized, setPrerequisitesInitialized] = useState(false);
	const [locationAlarms, setLocationAlarms] = useState([]);
	const [locationRouterAlarms, setLocationRouterAlarms] = useState([]);
	const [lastUpdate, setlastUpdate] = useState('');

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			const axiosOptionsUserLocations = axios(generateApiObject(server, 'GetUserLocations'));
			const axiosOptionsAuthenticatedUser = axios(
				generateApiObject(server, 'GetAuthenticatedUser')
			);
			const axiosOptionsUserSettings = axios(generateApiObject(server, 'GetUserSettings'));
			const axiosOptionsUserLocationsTags = axios(
				generateApiObject(server, 'GetUserLocationsTags')
			);

			try {
				const responses = await axios.all([
					axiosOptionsUserLocations,
					axiosOptionsAuthenticatedUser,
					axiosOptionsUserSettings,
					axiosOptionsUserLocationsTags
				]);
				setUserLocations(responses[0].data?.ReturnValue.$values);
				setAuthenticatedUser(responses[1].data.ReturnValue);
				setSettings(responses[2].data.ReturnValue);
				setUserLocationsTags(responses[3].data.ReturnValue);
				setPrerequisitesInitialized(true);
			} catch (err) {
				console.log(err);
				Alert.alert('Error on init');
			} finally {
				setLoading(false);
			}
		}

		fetchInitialData();
	}, []);

	useEffect(() => {
		if (prerequisitesInitialized) {
			fetchAlarms();
		}
	}, [prerequisitesInitialized]);

	const fetchAlarms = useCallback(async () => {
		setLoading(true);
		const showWarnings = authenticatedUser.ShowWarnings;
		// TODO: handle multi roots
		const locationID = userLocations[0].ID;

		const axiosOptionsLocationAlarms = axios(
			generateApiObject(server, 'GetLocationAlarms', { locationID, showWarnings })
		);
		const axiosOptionsLocationRouterAlarms = axios(
			generateApiObject(server, 'GetLocationRoutersAlarms', { locationID, showWarnings })
		);
		try {
			const responses = await axios.all([
				axiosOptionsLocationAlarms,
				axiosOptionsLocationRouterAlarms
			]);
			setLocationAlarms(parseAlarms(responses[0].data?.ReturnValue?.$values, showWarnings));
			setLocationRouterAlarms(parseAlarms(responses[1].data?.ReturnValue?.$values, showWarnings));
		} catch (err) {
			console.log(err);
			Alert.alert('Error on get alarms');
		} finally {
			setLoading(false);
			console.log(`Setting last update: ${new Date()}`);
			setlastUpdate(new Date());
		}
	});

	const handleRefresh = () => {
		fetchAlarms();
	};

	return (
		<SafeAreaView style={StyleSheet.container}>
			<FlatList
				ListHeaderComponent={
					<>
						<Header lastUpdate={lastUpdate} />
						<SummaryInfo alarms={locationAlarms} routerAlarms={locationRouterAlarms} />
					</>
				}
				data={[...locationAlarms, ...locationRouterAlarms]}
				renderItem={AlarmListItem}
				keyExtractor={(alarm) => alarm.$id}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={handleRefresh}
						tintColor='#FFFFFF'
						colors={['#FFFFFF']}
					/>
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	}
});

export default Dashboard;

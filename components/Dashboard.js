import React, { useState, useEffect, useContext } from 'react';
import { TouchableHighlight, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

import AuthContext from '../context/auth';
import generateApiObject from '../utils/api';
import SummaryInfo from './SummaryInfo';
import AlarmListItem from './AlarmListItem';

const alarms = [
	{
		id: 1,
		assetMeasure: 'Temperature',
		value: '32.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'ok'
	},
	{
		id: 2,
		assetMeasure: 'Humidty',
		value: '16.9 %RH',
		location: 'Lab',
		asset: 'Clean Room',
		time: '12m 24s',
		status: 'critical'
	},
	{
		id: 3,
		assetMeasure: 'Temperature',
		value: '29.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'fault'
	},
	{
		id: 4,
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'warning'
	},
	{
		id: 5,
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		id: 6,
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		id: 7,
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		id: 8,
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	}
];

const Dashboard: () => React$Node = () => {
	const { server } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [userLocations, setUserLocations] = useState();
	const [authenticatedUser, setAuthenticatedUser] = useState();
	const [userSettings, setUserSettings] = useState();
	const [userLocationsTags, setUserLocationsTags] = useState();
	const [prerequisitesInitialized, setPrerequisitesInitialized] = useState(false);
	const [locationAlarms, setLocationAlarms] = useState([]);
	const [locationRouterAlarms, setLocationRouterAlarms] = useState([]);

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
				setUserSettings(responses[2].data.ReturnValue);
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
			const showWarnings = authenticatedUser.ShowWarnings;
			// TODO: handle multi roots
			const locationID = userLocations[0].ID;

			async function fetchAlarms() {
				setLoading(true);
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
					setLocationAlarms(responses[0].data?.ReturnValue?.$values);
					setLocationRouterAlarms(responses[1].data?.ReturnValue?.$values);
				} catch (err) {
					console.log(err);
					Alert.alert('Error on get alarms');
				} finally {
					setLoading(false);
				}
			}
			fetchAlarms();
		}
	}, [prerequisitesInitialized]);

	console.log('RENDERING DASHBOARD');

	return (
		<View>
			<SummaryInfo alarms={locationAlarms} routerAlarms={locationRouterAlarms}></SummaryInfo>
			<Text>DASHBOARD</Text>
			{loading && <Text>LOADING...</Text>}

			<Text>{JSON.stringify(locationAlarms.length, null, 2)}</Text>
			<Text>{JSON.stringify(locationRouterAlarms.length, null, 2)}</Text>

			<Text>{JSON.stringify(locationAlarms, null, 2)}</Text>
			<Text>{JSON.stringify(locationRouterAlarms, null, 2)}</Text>

			{/* <Text>{JSON.stringify(userLocations, null, 2)}</Text> */}

			{/* 	<Button title='REFRESH All' onPress={() => refresh()} />
			<Button title='REFRESH USER LOCATIONS' onPress={() => refreshLocations()} />
			<Button title='REFRESH Auth USER' onPress={() => refreshAuthUser()} />
			<Text>{JSON.stringify(userLocations?.$id, null, 2)}</Text>
			
			<Text>{JSON.stringify(authenticatedUser?.$id, null, 2)}</Text>
			<Text>{JSON.stringify(authenticatedUser?.ReturnValue?.UserName, null, 2)}</Text>
			<Text>{JSON.stringify(userSettings?.ReturnValue, null, 2)}</Text>
			<Text>{JSON.stringify(userLocationsTags?.ReturnValue, null, 2)}</Text> */}

			{/* 			{alarms.map((alarm) => (
				<AlarmListItem key={alarm.id} alarm={alarm} />
			))} */}
		</View>
	);
};

export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import { TouchableHighlight, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

import AuthContext from '../context/auth';
import generateApiObject from '../utils/api';
import SummaryInfo from './SummaryInfo';
import Header from './Header';
import AlarmListItem from './AlarmListItem';
import { parseAlarms } from '../utils/alarms';

const alarms = [
	{
		ID: 1,
		AssetMeasureName: 'Temperature',
		LastValue: '32.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'ok'
	},
	{
		ID: 2,
		AssetMeasureName: 'Humidty',
		LastValue: '16.9 %RH',
		LocationName: 'Lab',
		AssetName: 'Clean Room',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'critical'
	},
	{
		ID: 3,
		AssetMeasureName: 'Temperature',
		LastValue: '29.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'fault'
	},
	{
		ID: 4,
		AssetMeasureName: 'Temperature',
		LastValue: '10.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'warning'
	},
	{
		ID: 5,
		AssetMeasureName: 'Temperature',
		LastValue: '10.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'error'
	},
	{
		ID: 6,
		AssetMeasureName: 'Temperature',
		LastValue: '10.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'error'
	},
	{
		ID: 7,
		AssetMeasureName: 'Temperature',
		LastValue: '10.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
		status: 'error'
	},
	{
		ID: 8,
		AssetMeasureName: 'Temperature',
		LastValue: '10.0 °F',
		LocationName: "Eran's House",
		AssetName: 'Garage Cooler',
		CreatedOn: '2020-08-24T18:00:04Z',
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
					setLocationAlarms(parseAlarms(responses[0].data?.ReturnValue?.$values), showWarnings);
					setLocationRouterAlarms(
						parseAlarms(responses[1].data?.ReturnValue?.$values),
						showWarnings
					);
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
			<Header />
			<SummaryInfo alarms={locationAlarms} routerAlarms={locationRouterAlarms}></SummaryInfo>
			{/* <Text>{JSON.stringify(locationAlarms, null, 2)}</Text> */}

			{[...locationAlarms, ...locationRouterAlarms].map((alarm) => (
				<AlarmListItem key={alarm.$id} alarm={alarm} />
			))}
		</View>
	);
};

export default Dashboard;

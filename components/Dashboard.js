import React, { useState, useEffect, useContext } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native';
import axios from 'axios';

import AuthContext from '../context/auth';
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
	const [refreshing, setRefreshing] = React.useState(false);

	useEffect(() => {
		getUserLocations();
	}, []);

	const getUserLocations = async () => {
		const body = {
			Action: 'GetUserLocations',
			Parameters: {}
		};

		const options = {
			url: server,
			method: 'post',
			data: body,
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'ecs/json',
				Action: 'GetUserLocations'
			}
		};
		try {
			const response = await axios(options);
			debugger;
			console.log(`Response: ${response}`);
		} catch (err) {
			debugger;
			console.log(`Error: ${err}`);
		}
	};

	return (
		<>
			<SummaryInfo></SummaryInfo>
			{alarms.map((alarm) => (
				<AlarmListItem key={alarm.id} alarm={alarm} />
			))}
		</>
	);
};

export default Dashboard;

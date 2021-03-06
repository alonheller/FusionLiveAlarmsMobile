import React, { useState, useEffect, useContext } from 'react';
import { TouchableHighlight, View, Text, Button } from 'react-native';
import useAxios from 'axios-hooks';

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
	const HEADERS = {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'ecs/json',
		Action: 'GetUserLocations'
	};

	const METHODS = {
		POST: 'POST',
		GET: 'GET'
	};

	const body = { Action: 'GetUserLocations', Parameters: {} };

	const options = {
		url: server,
		method: METHODS.POST,
		data: body,
		headers: HEADERS
	};
	const [{ data, loading, error }, refetch] = useAxios(options);

	return (
		<View>
			<Text>DASHBOARD</Text>
			<Button title='REFRESH' onPress={() => refetch()} />
			<Text>{JSON.stringify(data, null, 2)}</Text>

			{/* 	{loading && <Text>LOADING...</Text>}*/}
			{/* <SummaryInfo></SummaryInfo>
			{alarms.map((alarm) => (
				<AlarmListItem key={alarm.id} alarm={alarm} />
			))} */}
		</View>
	);
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { TouchableHighlight, View, Text, Button } from 'react-native';

import useData from '../hooks/useData';
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
	const [refreshing, setRefreshing] = React.useState(false);

	const [
		{ data: userLocations, loading: userLocationsLoading, error: userLocationsError },
		refetchUserLocations
	] = useData('GetUserLocations', {});

	const [
		{ data: authenticatedUser, loading: authenticatedUserLoading, error: authenticatedUserError },
		refetchAuthenticatedUser
	] = useData('GetAuthenticatedUser', {});

	const [{ data: userSettings, loading: userSettingsLoading, error: userSettingsError }] = useData(
		'GetUserSettings',
		{}
	);

	const [
		{ data: userLocationsTags, loading: userLocationsTagsLoading, error: userLocationsTagsError }
	] = useData('GetUserSettings', {});

	const refresh = () => {
		refetchUserLocations();
		refetchAuthenticatedUser();
	};

	const refreshLocations = () => {
		refetchUserLocations();
	};
	const refreshAuthUser = () => {
		refetchAuthenticatedUser();
	};
	return (
		<View>
			<Text>DASHBOARD</Text>
			<Button title='REFRESH All' onPress={() => refresh()} />
			<Button title='REFRESH USER LOCATIONS' onPress={() => refreshLocations()} />
			<Button title='REFRESH Auth USER' onPress={() => refreshAuthUser()} />
			<Text>{JSON.stringify(userLocations?.$id, null, 2)}</Text>
			<Text>{JSON.stringify(userLocations?.ReturnValue?.$values[0].Name, null, 2)}</Text>
			<Text>{JSON.stringify(authenticatedUser?.$id, null, 2)}</Text>
			<Text>{JSON.stringify(authenticatedUser?.ReturnValue?.UserName, null, 2)}</Text>
			<Text>{JSON.stringify(userSettings?.ReturnValue, null, 2)}</Text>
			<Text>{JSON.stringify(userLocationsTags?.ReturnValue, null, 2)}</Text>

			{(userLocationsLoading ||
				authenticatedUserLoading ||
				userSettingsLoading ||
				userLocationsTagsLoading) && <Text>LOADING...</Text>}
			{/* <SummaryInfo></SummaryInfo>
			{alarms.map((alarm) => (
				<AlarmListItem key={alarm.id} alarm={alarm} />
			))} */}
		</View>
	);
};

export default Dashboard;

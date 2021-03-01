import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Text } from 'react-native';
import SummaryInfo from './SummaryInfo';
import AlarmListItem from './AlarmListItem';

const alarms = [
	{
		assetMeasure: 'Temperature',
		value: '32.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'ok'
	},
	{
		assetMeasure: 'Humidty',
		value: '16.9 %RH',
		location: 'Lab',
		asset: 'Clean Room',
		time: '12m 24s',
		status: 'critical'
	},
	{
		assetMeasure: 'Temperature',
		value: '29.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'fault'
	},
	{
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'warning'
	},
	{
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	},
	{
		assetMeasure: 'Temperature',
		value: '10.0 °F',
		location: "Eran's House",
		asset: 'Garage Cooler',
		time: '2d 7h 45m 14s',
		status: 'error'
	}
];

const Dashboard: () => React$Node = () => {
	return (
		<>
			<SummaryInfo></SummaryInfo>
			{alarms.map((alarm) => (
				<AlarmListItem alarm={alarm} />
			))}
		</>
	);
};

export default Dashboard;

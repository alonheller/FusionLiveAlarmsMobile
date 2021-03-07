import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

import statusViewsMap from '../utils/statusViewsMap';

const SummaryInfo: () => React$Node = (props) => {
	const { alarms, routerAlarms } = props;
	const [disconnectionCounter, setDisconnectionCounter] = useState(0);
	const [errorCounter, setErrorCounter] = useState(0);
	const [warningCounter, setWarningCounter] = useState(0);
	const [successCounter, setSuccessCounter] = useState(0);

	const getBadge = (statusView) => {
		switch (statusView) {
			case statusViewsMap.OK:
			case statusViewsMap.SNOOZE:
			case statusViewsMap.BYPASS_ALARM_TYPE:
			case statusViewsMap.BYPASS:
			case statusViewsMap.ACK_WARNING:
			case statusViewsMap.ACK_CRITICAL:
			case statusViewsMap.ACK_FAULT:
			case statusViewsMap.ACK_FAULT_OPEN:
			case statusViewsMap.ACK_FAULT_SHORTED:
			case statusViewsMap.ACK_FAULT_COMM:
			case statusViewsMap.ACK_DISCONNECTED: {
				return 'ok';
				// break;
			}

			case statusViewsMap.WARNING: {
				return 'warning';
				// break;
			}

			case statusViewsMap.CRITICAL:
			case statusViewsMap.ROUTER_POWER_ALERT:
			case statusViewsMap.ESCALATION_ALERT:
			case statusViewsMap.FAULT:
			case statusViewsMap.FAULT_COMM:
			case statusViewsMap.FAULT_OPEN:
			case statusViewsMap.FAULT_SHORTED:
			case statusViewsMap.ROUTER_CHARGING_FAULT: {
				return 'alarms';
				// break;
			}

			case statusViewsMap.DISCONNECTED:
			case statusViewsMap.ROUTER_DISCONNECTED: {
				return 'disconnct';
				// break;
			}
		}
	};

	useEffect(() => {
		let disconnectionCounterTmp = 0;
		let errorCounterTmp = 0;
		let warningCounterTmp = 0;
		let successCounterTmp = 0;

		alarms.forEach((alarm) => {
			switch (getBadge(alarm.StatusView)) {
				case 'ok':
					successCounterTmp = successCounterTmp + 1;
					break;
				case 'alarms':
					errorCounterTmp = errorCounterTmp + 1;
					break;
				case 'disconnct':
					disconnectionCounterTmp = disconnectionCounterTmp + 1;
					break;
				case 'warning':
					warningCounterTmp = warningCounterTmp + 1;
					break;
			}
		});

		routerAlarms.forEach((alarm) => {
			switch (getBadge(alarm.StatusView)) {
				case 'ok':
					successCounterTmp = successCounterTmp + 1;
					break;
				case 'alarms':
					errorCounterTmp = errorCounterTmp + 1;
					break;
				case 'disconnct':
					disconnectionCounterTmp = disconnectionCounterTmp + 1;
					break;
				case 'warning':
					warningCounterTmp = warningCounterTmp + 1;
					break;
			}
		});

		setDisconnectionCounter(disconnectionCounterTmp);
		setErrorCounter(errorCounterTmp);
		setWarningCounter(warningCounterTmp);
		setSuccessCounter(successCounterTmp);
	}, [alarms, routerAlarms]);

	return (
		<View style={[styles.elementsContainer]}>
			<Badge value={disconnectionCounter} status='primary' />
			<Badge value={errorCounter} status='error' />
			<Badge value={warningCounter} status='warning' />
			<Badge value={successCounter} status='success' />
		</View>
	);
};

const styles = {
	elementsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginLeft: 24,
		marginRight: 24
	}
};

export default SummaryInfo;

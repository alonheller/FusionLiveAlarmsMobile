import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

import { statusViewsMap, getBadge, countAlarms } from '../utils/status';

const SummaryInfo: () => React$Node = (props) => {
	const { alarms, routerAlarms } = props;
	const [disconnectionCounter, setDisconnectionCounter] = useState(0);
	const [errorCounter, setErrorCounter] = useState(0);
	const [warningCounter, setWarningCounter] = useState(0);
	const [successCounter, setSuccessCounter] = useState(0);

	useEffect(() => {
		const statuses = countAlarms([...alarms, ...routerAlarms]);

		setDisconnectionCounter(statuses.disconnectionCounterTmp);
		setErrorCounter(statuses.errorCounterTmp);
		setWarningCounter(statuses.warningCounterTmp);
		setSuccessCounter(statuses.successCounterTmp);
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

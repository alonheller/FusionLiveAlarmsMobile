import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';

import SettingsContext from '../context/settings';

const Header: () => React$Node = ({ lastUpdate }) => {
	const history = useHistory();
	const [updated, setUpdated] = useState('---');
	const { settings, setSettings } = useContext(SettingsContext);

	useEffect(() => {
		if (lastUpdate instanceof Date && !isNaN(lastUpdate.valueOf())) {
			setUpdated(format(lastUpdate, 'MM/dd/yyyy hh:mm:ss aa'));
		}
	}, [lastUpdate]);

	const onSettingsPress = () => {
		history.push('/settings');
	};

	return (
		<View>
			<View style={styles.elementsContainer}>
				<Text style={styles.title}>ALARMS</Text>
				<Text style={settings.DarkMode ? styles.subTitleRed : styles.subTitle}>
					Last update on: {updated}
				</Text>
			</View>
			<View style={styles.logoContainer}>
				<Image style={styles.tinyLogo} source={require('./logo.png')} />
				<Icon name='settings' size={18} reverse onPress={onSettingsPress} />
			</View>
		</View>
	);
};

const styles = {
	elementsContainer: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		/* backgroundColor: 'FF0000', */
		margin: 15
	},
	tinyLogo: {
		width: 160,
		height: 30
	},
	title: {
		color: '#ECEFF1',
		fontSize: 15,
		fontWeight: 'bold'
	},
	subTitle: {
		fontSize: 11,
		color: '#808491'
	},
	subTitleRed: {
		fontSize: 11,
		color: '#FF0000'
	}
};

export default Header;

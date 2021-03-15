import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const Header: () => React$Node = () => {
	return (
		<View>
			<View style={styles.elementsContainer}>
				<Text style={styles.title}>ALARMS</Text>
				<Text style={styles.subTitle}>Last update on: 03/10/2021 08:45:01 PM</Text>
			</View>
			<View style={styles.logoContainer}>
				<Image style={styles.tinyLogo} source={require('./logo.png')} />
				<Icon name='settings' size={18} reverse />
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
	}
};

export default Header;

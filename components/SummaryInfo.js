import React, { useState } from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

const SummaryInfo: () => React$Node = () => {
	return (
		<View style={styles.container}>
			<View style={[{ flex: 1 }, styles.elementsContainer]}>
				<Badge value='3' status='success' />
				<Badge value='99+' status='error' />
				<Badge value='5' status='primary' />
				<Badge value='22' status='warning' />
			</View>
		</View>
	);
};

const styles = {
	container: {
		marginTop: 48,
		flex: 1
	},
	elementsContainer: {
		backgroundColor: '#ecf5fd',
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 24
	}
};

export default SummaryInfo;

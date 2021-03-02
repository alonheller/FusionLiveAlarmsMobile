import React, { useState } from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

const SummaryInfo: () => React$Node = () => {
	return (
		<View style={[styles.elementsContainer]}>
			<Badge value='3' status='success' />
			<Badge value='99+' status='error' />
			<Badge value='5' status='primary' />
			<Badge value='22' status='warning' />
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

import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'react-native';
import { ListItem, Avatar, Badge, Icon } from 'react-native-elements';

const Dashboard: () => React$Node = () => {
	return (
		<>
			<Badge value='3' status='success' />
			<Badge value='99+' status='error' />
			<Badge value='5' status='primary' />
			<Badge value='22' status='warning' />
			<ListItem
				Component={TouchableHighlight}
				containerStyle={{}}
				disabledStyle={{ opacity: 0.5 }}
				onLongPress={() => console.log('onLongPress()')}
				onPress={() => console.log('onLongPress()')}
				pad={20}>
				<Icon name='error-outline' />
				<ListItem.Content>
					<ListItem.Title>
						<Text>Temperature 32.0 °F</Text>
					</ListItem.Title>
					<ListItem.Subtitle>
						<Text>Eran's House</Text>
					</ListItem.Subtitle>
					<ListItem.Subtitle>
						<Text>Garage Cooler</Text>
					</ListItem.Subtitle>
					<ListItem.Subtitle>
						<Text>2d 7h 45m 14s</Text>
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</>
	);
};

/* const styles = StyleSheet.create({
	body: {
		backgroundColor: Colors.white
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	}
}); */

export default Dashboard;

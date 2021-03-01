import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

/* 
https://oblador.github.io/react-native-vector-icons/
*/
const AlarmListItem: (props) => React$Node = (props) => {
	const { assetMeasure, value, location, asset, time, status } = props.alarm;

	const getIconName = (status) => {
		switch (status) {
			case 'fault':
				return 'disabled-by-default';
			case 'warning':
				return 'warning';
			case 'critical':
			case 'error':
				return 'error-outline';
			case 'ok':
				return 'checkcircleo';
			default:
				return 'questioncircleo';
		}
	};

	return (
		<ListItem
			Component={TouchableHighlight}
			containerStyle={{}}
			disabledStyle={{ opacity: 0.5 }}
			onLongPress={() => console.log('onLongPress()')}
			onPress={() => console.log('onLongPress()')}
			pad={20}>
			<Icon name={getIconName(status)} />
			<ListItem.Content>
				<ListItem.Title>
					<Text>
						{assetMeasure} {value}
					</Text>
				</ListItem.Title>
				<ListItem.Subtitle>
					<Text>{location}</Text>
				</ListItem.Subtitle>
				<ListItem.Subtitle>
					<Text>{asset}</Text>
				</ListItem.Subtitle>
				<ListItem.Subtitle>
					<Text>{time}</Text>
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

const styles = {
	container: {
		marginTop: 48,
		flex: 1
	},
	headerStyle: {
		fontSize: 36,
		textAlign: 'center',
		fontWeight: '100',
		marginBottom: 24
	},
	elementsContainer: {
		backgroundColor: '#ecf5fd',
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 24
	}
};

export default AlarmListItem;

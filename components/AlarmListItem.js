import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { formatDistance } from 'date-fns';

/* 
https://oblador.github.io/react-native-vector-icons/
*/
const AlarmListItem: (props) => React$Node = (props) => {
	const { AssetMeasureName, LastValue, LocationName, AssetName, CreatedOn, status } = props.alarm;

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
				return 'warning';
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
						{AssetMeasureName} {LastValue}
					</Text>
				</ListItem.Title>
				<ListItem.Subtitle>
					<Text>{LocationName}</Text>
				</ListItem.Subtitle>
				<ListItem.Subtitle>
					<Text>{AssetName}</Text>
				</ListItem.Subtitle>
				<ListItem.Subtitle>
					<Text>{CreatedOn && formatDistance(Date.parse(CreatedOn), new Date())}</Text>
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

/* 
$id: "625"
$type: "AssetMeasureStatus"
AlarmClear: 0
AlarmTypeNumber: 4
AlertReason: 0
AssetID: 1
AssetMeasureID: 2
AssetMeasureName: "Temperature"
AssetName: "Asset Mock 1"
BypassType: 0
ChangeType: 0
ConnStatus: 0
CreatedOn: "2020-08-27T20:18:00.283Z"
FalseString: "False"
ID: 8
IsLastStatus: false
LastUpdate: "2020-08-24T18:45:04Z"
LastValue: -80.4
LocationID: 4
LocationName: "Joe Amar"
LogCount: 4
MaxValue: -80.4
MeasureID: 1
MeasureName: "Temperature"
MeasureUnitDescription: "C"
MeasureUnitID: 8
MeasureUnitName: "C"
MinValue: -82.2
Precision: 1
RowState: 2
Seq: 0
StatusCategory: 0
StatusCode: 4
StatusCodeCounter: 0
StatusTimestamp: "2020-08-24T18:00:04Z"
StatusType: 0
StatusView: 400
TrueString: "True"
*/

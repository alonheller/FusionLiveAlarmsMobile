import React from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { formatDistance } from 'date-fns';

/* 
https://oblador.github.io/react-native-vector-icons/
*/
const AlarmListItem: (props) => React$Node = (props) => {
	const {
		AssetMeasureName,
		LastValueParsed,
		statusViewParsed,
		LocationName,
		AssetName,
		CreatedOn,
		status
	} = props.alarm;

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
				return 'warning';
		}
	};

	return (
		<ListItem
			Component={TouchableHighlight}
			containerStyle={{
				backgroundColor: '#292D39',
				marginLeft: 12,
				marginRight: 12,
				marginTop: 8,
				marginBottom: 8,
				borderRadius: 7
			}}
			disabledStyle={{ opacity: 0.5 }}
			onLongPress={() => console.log('onLongPress()')}
			onPress={() => console.log('onLongPress()')}
			pad={0}>
			<ListItem.Content>
				<View style={styles.row}>
					<View style={styles.iconContainer}>
						<Icon name={getIconName(status)} color='#00aced' size={42}></Icon>
					</View>
					<View style={styles.locationContainer}>
						<ListItem.Title style={[styles.mainColor, styles.verticalLineSpace]}>
							{LocationName}
						</ListItem.Title>
						<ListItem.Subtitle style={styles.subColor}>{AssetName}</ListItem.Subtitle>
					</View>
					<View style={styles.valueContainer}>
						<ListItem.Title style={[styles.mainColor, styles.value]}>
							{LastValueParsed}
						</ListItem.Title>
						<ListItem.Subtitle style={styles.subColor}>{AssetMeasureName}</ListItem.Subtitle>
					</View>
				</View>
				<View style={styles.horizontalLine} />
				<View style={[styles.row, styles.statusContainer]}>
					<ListItem.Subtitle style={[styles.subColor, styles.statusCaption]}>
						{statusViewParsed}
					</ListItem.Subtitle>
					<ListItem.Subtitle style={styles.subColor}>
						{CreatedOn && formatDistance(Date.parse(CreatedOn), new Date())}
					</ListItem.Subtitle>
				</View>
			</ListItem.Content>
		</ListItem>
	);
};

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'nowrap'
	},
	iconContainer: {
		flexBasis: 50
	},
	locationContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	valueContainer: {
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	value: {
		backgroundColor: 'red',
		color: 'red'
	},
	verticalLineSpace: {
		marginBottom: 8
	},
	mainColor: {
		color: '#ECEFF1'
	},
	subColor: {
		color: '#808491'
	},
	locationFont: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	value: {
		fontWeight: '600',
		fontSize: 25
	},
	horizontalLine: {
		marginTop: 7,
		marginBottom: 7,
		borderBottomColor: '#434753',
		borderBottomWidth: 1,
		width: '100%'
	},
	statusCaption: {
		textTransform: 'uppercase'
	},
	statusContainer: {
		justifyContent: 'space-between',
		width: '100%'
	}
});

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

import { statusViewsMap, statusView } from './status';
import { DBConstants, Measures, defaults, statusCodesMap } from './constants';

export const parseAlarms = (alarms, showWarnings) => {
	let parsedAlarms = [];
	const now = new Date();

	// TODO: should come from settings
	const showAcksBypassAndSnooze = true;
	const delayAlarmsInSeconds = 0;

	alarms.forEach((item) => {
		duration = calcSecondsTimeSpan(new Date(item.StatusTimestamp), now);
		if (
			(item.StatusView < 101 || item.StatusView > 199 || showAcksBypassAndSnooze) && // NOT Ack/Bypass/Snooze OR Ack/Bypass/Snooze is Allowed
			(item.StatusView !== statusViewsMap.WARNING || showWarnings) && // NOT Warning OR Warning is Allowed
			duration > delayAlarmsInSeconds
		) {
			item.Duration = duration; // duration is longer that value in Settings
			item.Equipment = item.AssetName !== '' ? item.AssetName : item.ObjectName;
			item.StatusTimestampParsed = parseDate(item.StatusTimestamp);
			item.LastUpdateParsed = parseDate(item.LastUpdate);
			item.LastValueParsed =
				item.StatusCode !== statusCodesMap.DISCONNECTED ? formatLogValue(item) : '---';
			item.StatusTimestampDurationParsed = parseDuraion(duration);
			item.statusViewParsed = getStatusViewName(item.StatusView);
			const statusView = getStatusView(item.StatusView);
			item.StatusViewIcon = statusView?.statusIcon;
			item.StatusViewColor = statusView?.color;
			/* item.Style = {
				backgroundColor: this.getBGColor(item.StatusView),
				color: '#FFFFFF',
				opacity: '0.85'
			}; */
			item.Priority = getPriority(item.StatusView);

			if (item.StatusType === 2) {
				item.AssetMeasureName += ' (' + item.TemplateName + ')';
				item.LastValueParsed = parseDuraion(item.CumulativeTime);
			}

			// this.setCounters(item.StatusView);
			parsedAlarms.push(item);
		}
	});
	parsedAlarms = sortAlarms(parsedAlarms, 'Duration', 'Priority');

	return parsedAlarms;
};

const namesComparer = (item1, item2) => {
	const digitRegex = /^\d/;
	const alphabetRegex = /^[a-zA-Z]/;
	const symbolRegex = /^[^\w\s]/;

	const a = item1['Name'].toLowerCase();
	const b = item2['Name'].toLowerCase();
	const scoreA =
		+symbolRegex.test(a) * 1 || +digitRegex.test(a) * 10 || +alphabetRegex.test(a) * 100;
	const scoreB =
		+symbolRegex.test(b) * 1 || +digitRegex.test(b) * 10 || +alphabetRegex.test(b) * 100;

	if (scoreA !== scoreB) {
		return scoreA - scoreB;
	}

	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}

	return 0;
};

const labelsComparer = (item1, item2) => {
	const digitRegex = /^\d/;
	const alphabetRegex = /^[a-zA-Z]/;
	const symbolRegex = /^[^\w\s]/;

	const a = item1['label'].toLowerCase();
	const b = item2['label'].toLowerCase();
	const scoreA =
		+symbolRegex.test(a) * 1 || +digitRegex.test(a) * 10 || +alphabetRegex.test(a) * 100;
	const scoreB =
		+symbolRegex.test(b) * 1 || +digitRegex.test(b) * 10 || +alphabetRegex.test(b) * 100;

	if (scoreA !== scoreB) {
		return scoreA - scoreB;
	}

	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}

	return 0;
};

function naturalCompare(a, b, isDesc): number {
	const ax = [];
	const bx = [];

	if (!a) {
		return 1000;
	}

	if (!b) {
		return -1000;
	}

	if (!(a && b)) {
		return 0;
	}

	a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
		ax.push([$1 || Infinity, $2 || '']);
	});
	b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
		bx.push([$1 || Infinity, $2 || '']);
	});

	while (ax.length && bx.length) {
		const an = ax.shift();
		const bn = bx.shift();
		const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
		if (nn) {
			return nn;
		}
	}

	return isDesc ? bx.length - ax.length : ax.length - bx.length;
}

const sortAlarms = (arr, byField = 'Name', byScndField = null, isDesc = false) => {
	if (!(arr && arr.length > 0)) {
		return arr;
	}

	if (!arr[0].hasOwnProperty(byField)) {
		return arr;
	}

	if (byField === 'Name' && !byScndField) {
		return arr.sort(namesComparer);
	}

	if (byField === 'label' && !byScndField) {
		return arr.sort(labelsComparer);
	}

	return arr.sort((item1, item2) => {
		if (typeof item1[byField] === 'string') {
			let res = naturalCompare(item1[byField], item2[byField], isDesc);
			if (res === 0 && byScndField && byScndField.length > 0) {
				if (typeof item1[byScndField] === 'string') {
					res = naturalCompare(item1[byScndField], item2[byScndField], isDesc);
				} else {
					res = 0;
					if (item1[byField] > item2[byField]) {
						res = isDesc ? -1 : 1;
					}
					if (item1[byField] < item2[byField]) {
						res = isDesc ? 1 : -1;
					}
				}
			}
			return res;
		} else {
			if (item1[byField] > item2[byField]) {
				return isDesc ? -1 : 1;
			}
			if (item1[byField] < item2[byField]) {
				return isDesc ? 1 : -1;
			}

			if (byScndField && byScndField.length > 0) {
				if (typeof item1[byScndField] === 'string') {
					return naturalCompare(item1[byScndField], item2[byScndField], isDesc);
				} else {
					if (item1[byScndField] > item2[byScndField]) {
						return 1;
					}
					if (item1[byScndField] < item2[byScndField]) {
						return -1;
					}
				}
			}

			return 0;
		}
	});
};

const parseDate = (value, args?) => {
	const nullDate = DBConstants.DATE_TIME_NULL;
	return 'parsedDate';

	/* if (value instanceof Date) {
    if (value > nullDate) {
      return formatDate(value, 'MM/dd/yyyy hh:mm:ss a', 'en-us');
    } else {
      return '';
    }
  }

  if (typeof value === "string") {
    const newDate = new Date(value);
    if (newDate > nullDate) {
      return formatDate(newDate, 'MM/dd/yyyy hh:mm:ss a', 'en-us');
    }
  }

  return ''; */
};

const parseDuraion = (timeInSeconds, args?) => {
	return '0s';

	/* if (timeInSeconds == 0) {
      return '0s';
  }

  const numDays = Math.floor(timeInSeconds / 86400);
  const numHours = Math.floor((timeInSeconds % 86400) / 3600);
  const numMinutes = Math.floor(((timeInSeconds % 86400) % 3600) / 60);
  const numSeconds = Math.floor(((timeInSeconds % 86400) % 3600) % 60);

  const days: String = formatNumber(numDays, 'en', '1.0-0');
  const hours: String = formatNumber(numHours, 'en', '1.0-0');
  const minutes: String = formatNumber(numMinutes, 'en', '1.0-0');
  const seconds: String = formatNumber(numSeconds, 'en', '1.0-0');

  let duration: String = '';
  if (days && days != '0') {
      duration += days + 'd';
  }

  if (hours && hours != '0') {
      duration += (duration == '' ? '' : ' ') + hours + 'h';
  }

  if (minutes && minutes != '0') {
      duration += (duration == '' ? '' : ' ') + minutes + 'm';
  }

  if (seconds && seconds != '0') {
      duration += (duration == '' ? '' : ' ') + seconds + 's';
  }

  return duration; */
};

const calcSecondsTimeSpan = (start, end) => {
	if (!(end > DBConstants.DATE_TIME_NULL)) {
		end = new Date();
	}

	return (end.getTime() - start.getTime()) / 1000;
};

const formatLogValue = (item) => {
	const { LastValue, MeasureID, MeasureUnitName, TrueString, FalseString, Precision } = item;
	if (
		LastValue === undefined ||
		LastValue === DBConstants.DOUBLE_NULL ||
		LastValue === DBConstants.FLOAT_NULL
	) {
		return '';
	}

	if (MeasureID === Measures.DIGITAL) {
		return LastValue === defaults.NAFEM_TRUE ? TrueString : FalseString;
	}

	return LastValue.toFixed(Precision) + ' ' + MeasureUnitName;
};

const getStatusViewName = (statusView, statusType = 0, showWarnings = true) => {
	let statusName: string = null;

	if (statusType === 0) {
		switch (statusView) {
			case statusViewsMap.OK: {
				statusName = 'OK';
				break;
			}

			case statusViewsMap.SNOOZE: {
				statusName = 'Alarm Snooze';
				break;
			}

			case statusViewsMap.BYPASS_ALARM_TYPE: {
				statusName = 'Alarm Bypass';
				break;
			}

			case statusViewsMap.BYPASS: {
				statusName = 'Alarm Bypass';
				break;
			}

			case statusViewsMap.ACK_WARNING: {
				statusName = 'Warning (Ack)';
				break;
			}

			case statusViewsMap.ACK_CRITICAL: {
				statusName = 'Critical (Ack)';
				break;
			}

			case statusViewsMap.ACK_FAULT: {
				statusName = 'Fault - General (Ack)';
				break;
			}

			case statusViewsMap.ACK_FAULT_OPEN: {
				statusName = 'Fault - Open Sensor (Ack)';
				break;
			}

			case statusViewsMap.ACK_FAULT_SHORTED: {
				statusName = 'Fault - Shorted Sensor (Ack)';
				break;
			}

			case statusViewsMap.ACK_FAULT_COMM: {
				statusName = 'Fault - Communication Error (Ack)';
				break;
			}

			case statusViewsMap.ACK_DISCONNECTED: {
				statusName = 'Disconnected (Ack)';
				break;
			}

			case statusViewsMap.WARNING: {
				if (showWarnings) {
					statusName = 'Warning';
				} else {
					statusName = 'OK';
				}

				break;
			}

			case statusViewsMap.CRITICAL: {
				statusName = 'Critical';
				break;
			}

			case statusViewsMap.FAULT: {
				statusName = 'Fault - General';
				break;
			}

			case statusViewsMap.FAULT_OPEN: {
				statusName = 'Fault - Open Sensor';
				break;
			}

			case statusViewsMap.FAULT_SHORTED: {
				statusName = 'Fault - Shorted Sensor';
				break;
			}

			case statusViewsMap.FAULT_COMM: {
				statusName = 'Fault - Communication Error';
				break;
			}

			case statusViewsMap.DISCONNECTED: {
				statusName = 'Disconnected';
				break;
			}

			case statusViewsMap.ROUTER_DISCONNECTED: {
				statusName = 'Router Disconnected';
				break;
			}

			case statusViewsMap.ROUTER_CHARGING_FAULT: {
				statusName = 'Router Charging Fault';
				break;
			}

			case statusViewsMap.ROUTER_POWER_ALERT: {
				statusName = 'Router Power Alert';
				break;
			}

			case statusViewsMap.ESCALATION_ALERT: {
				statusName = 'Escalation Alert';
				break;
			}

			default:
				statusName = 'N/A';
				break;
		}
	}

	if (statusType === 1) {
		switch (statusView) {
			case 0: {
				statusName = 'OK';
				break;
			}

			case 1: {
				statusName = 'Router Power Alert';
				break;
			}

			case 2: {
				statusName = 'Router Charging Fault';
				break;
			}

			case 3: {
				statusName = 'Router Disconnected';
				break;
			}
		}
	}

	if (statusType === 2) {
		switch (statusView) {
			case 0: {
				statusName = 'OK';
				break;
			}

			case 1: {
				statusName = 'Escalation Warning';
				break;
			}

			case 2: {
				statusName = 'Escalation Alerts';
				break;
			}
		}
	}

	return statusName;
};

const getStatusView = (statusViewCodeTmp, statusType = 0, showWarnings = true) => {
	if (statusViewCodeTmp === statusViewsMap.WARNING && !showWarnings) {
		statusViewCodeTmp = statusViewsMap.OK;
	}

	switch (statusType) {
		case 0: {
			return statusView[statusViewCodeTmp] ? statusView[statusViewCodeTmp] : undefined;
		}

		case 1: {
			switch (statusViewCodeTmp) {
				case 0: {
					return statusView[100]; // OK
				}
				case 1: {
					return statusView[400]; // CRITICAL
				}

				case 2: {
					return statusView[500]; // FAULT
				}

				case 3: {
					return statusView[900]; // DISCONNECTED
				}

				default: {
					return undefined;
				}
			}
		}

		case 2: {
			return statusView[statusViewCodeTmp] ? statusView[statusViewCodeTmp] : undefined;
		}

		default: {
			return undefined;
		}
	}
};

const getPriority = (statusView) => {
	let prior = 0;

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
			prior = 1;
			break;
		}

		case statusViewsMap.WARNING: {
			prior = 2;
			break;
		}

		case statusViewsMap.CRITICAL:
		case statusViewsMap.ROUTER_POWER_ALERT:
		case statusViewsMap.ESCALATION_ALERT: {
			prior = 4;
			break;
		}

		case statusViewsMap.FAULT:
		case statusViewsMap.FAULT_COMM:
		case statusViewsMap.FAULT_OPEN:
		case statusViewsMap.FAULT_SHORTED:
		case statusViewsMap.ROUTER_CHARGING_FAULT: {
			prior = 5;
			break;
		}

		case statusViewsMap.DISCONNECTED:
		case statusViewsMap.ROUTER_DISCONNECTED: {
			prior = 9;
			break;
		}
	}

	return prior;
};

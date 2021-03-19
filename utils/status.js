export const statusViewsMap = {
	NOT_AVAILABLE: 0,
	OK: 100,
	SNOOZE: 113,
	BYPASS_ALARM_TYPE: 115,
	BYPASS: 117,
	ACK_WARNING: 122,
	ACK_CRITICAL: 124,
	ACK_FAULT: 125,
	ACK_FAULT_OPEN: 126,
	ACK_FAULT_SHORTED: 127,
	ACK_FAULT_COMM: 128,
	ACK_DISCONNECTED: 129,
	WARNING: 200,
	CRITICAL: 400,
	FAULT: 500,
	FAULT_OPEN: 600,
	FAULT_SHORTED: 700,
	FAULT_COMM: 800,
	DISCONNECTED: 900,
	ROUTER_DISCONNECTED: 1010,
	ROUTER_CHARGING_FAULT: 1020,
	ROUTER_POWER_ALERT: 1030,
	ESCALATION_ALERT: 2010
};

export const statusView = {
	100: { caption: 'OK', statusIcon: 'assets/images/status/ok.svg' },
	113: { caption: 'Snooze', statusIcon: 'assets/images/status/snooze.svg' },
	115: { caption: 'Bypass Alarm Type', statusIcon: 'assets/images/status/bypass.svg' },
	117: { caption: 'Bypass', statusIcon: 'assets/images/status/bypass.svg' },
	122: { caption: 'Ack. Warning', statusIcon: 'assets/images/status/warningAck.svg' },
	124: { caption: 'Ack. Critical', statusIcon: 'assets/images/status/criticalAck.svg' },
	125: { caption: 'Ack. Fault', statusIcon: 'assets/images/status/faultAck.svg' },
	126: { caption: 'Ack. Fault Open', statusIcon: 'assets/images/status/faultAck.svg' },
	127: { caption: 'Ack. Fault Shorted', statusIcon: 'assets/images/status/faultAck.svg' },
	128: { caption: 'Ack Fault Communication', statusIcon: 'assets/images/status/faultAck.svg' },
	129: { caption: 'Ack. Disconnected', statusIcon: 'assets/images/status/disconnectedAck.svg' },
	200: { caption: 'Warning', statusIcon: 'assets/images/status/warning.svg' },
	400: { caption: 'Critical', statusIcon: 'assets/images/status/critical.svg' },
	500: { caption: 'Fault', statusIcon: 'assets/images/status/fault.svg' },
	600: { caption: 'Fault Open', statusIcon: 'assets/images/status/fault.svg' },
	700: { caption: 'Fault Shorted', statusIcon: 'assets/images/status/fault.svg' },
	800: { caption: 'Fault Communication', statusIcon: 'assets/images/status/fault.svg' },
	900: { caption: 'Disconnected', statusIcon: 'assets/images/status/disconnected.svg' },
	1010: { caption: 'Router Disconnected', statusIcon: 'assets/images/status/disconnected.svg' },
	1020: { caption: 'Router Charging Fault', statusIcon: 'assets/images/status/fault.svg' },
	1030: { caption: 'Router Power Alert', statusIcon: 'assets/images/status/critical.svg' },
	2010: { caption: 'Escalation Alert', statusIcon: 'assets/images/status/critical.svg' }
};

export const getBadge = (statusView) => {
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
			return 'ok';
			// break;
		}

		case statusViewsMap.WARNING: {
			return 'warning';
			// break;
		}

		case statusViewsMap.CRITICAL:
		case statusViewsMap.ROUTER_POWER_ALERT:
		case statusViewsMap.ESCALATION_ALERT:
		case statusViewsMap.FAULT:
		case statusViewsMap.FAULT_COMM:
		case statusViewsMap.FAULT_OPEN:
		case statusViewsMap.FAULT_SHORTED:
		case statusViewsMap.ROUTER_CHARGING_FAULT: {
			return 'alarms';
			// break;
		}

		case statusViewsMap.DISCONNECTED:
		case statusViewsMap.ROUTER_DISCONNECTED: {
			return 'disconnct';
			// break;
		}
	}
};

export const countAlarms = (alarms) => {
	let disconnectionCounterTmp = 0;
	let errorCounterTmp = 0;
	let warningCounterTmp = 0;
	let successCounterTmp = 0;

	alarms.forEach((alarm) => {
		switch (getBadge(alarm.StatusView)) {
			case 'ok':
				successCounterTmp = successCounterTmp + 1;
				break;
			case 'alarms':
				errorCounterTmp = errorCounterTmp + 1;
				break;
			case 'disconnct':
				disconnectionCounterTmp = disconnectionCounterTmp + 1;
				break;
			case 'warning':
				warningCounterTmp = warningCounterTmp + 1;
				break;
		}
	});

	return {
		disconnectionCounterTmp,
		errorCounterTmp,
		warningCounterTmp,
		successCounterTmp
	};
};

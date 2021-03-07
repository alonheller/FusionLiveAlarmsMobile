const HEADERS = {
	Accept: 'application/json, text/plain, */*',
	'Content-Type': 'ecs/json'
};

const generateApiObject = (url, action, parameters = {}) => {
	const headers = Object.assign({ Action: action }, HEADERS);
	const body = { Action: action, Parameters: parameters };
	const options = { url, data: body, headers, method: 'POST' };
	return options;
};

export default generateApiObject;

import React, { useState, useEffect, useContext } from 'react';
import useAxios from 'axios-hooks';

import AuthContext from '../context/auth';

const HEADERS = {
	Accept: 'application/json, text/plain, */*',
	'Content-Type': 'ecs/json'
};

const useData = (action, parameters) => {
	const { server } = useContext(AuthContext);

	// get the data in the first time
	const headers = Object.assign({ Action: action }, HEADERS);
	const body = { Action: action, Parameters: parameters };
	const options = { url: server, data: body, headers, method: 'POST' };
	return ([{ data, loading, error }, refetch] = useAxios(options));
};

export default useData;

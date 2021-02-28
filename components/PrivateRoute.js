import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-native';
import { View, Text, StyleSheet } from 'react-native';
import AuthContext from '../context/auth';

const PrivateRoute: () => React$Node = ({ component: Comp, ...rest }) => {
	// const { authenticated } = rest;
	const { isAuthorized } = useContext(AuthContext);

	return (
		<View>
			<Route
				{...rest}
				render={(rest) => {
					if (isAuthorized) {
						return <Comp {...rest} />;
					} else {
						return (
							<Redirect
								to={{
									pathname: '/login',
									state: { from: rest.location }
								}}
							/>
						);
					}
				}}
			/>
		</View>
	);
};

export default PrivateRoute;

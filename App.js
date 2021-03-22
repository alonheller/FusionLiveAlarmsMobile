import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { NativeRouter, Route, Redirect, withRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext from './context/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: () => React$Node = (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [history, setHistory] = useState();

	useEffect(() => {
		if (authenticated) {
			history.push('/dashboard');
		}
	}, [authenticated]);

	const [isAuthorized, setIsAuthorized] = useState(false);
	const [server, setServer] = useState('http://192.168.1.150:10200');
	const value = { isAuthorized, setIsAuthorized, server, setServer };

	return (
		<SafeAreaProvider>
			<StatusBar barStyle='dark-content' />
			<SafeAreaView style={styles.safeAreaView}>
				<AuthContext.Provider value={value}>
					<NativeRouter>
						<Route exact path='/' component={Login} />
						<PrivateRoute path='/dashboard' component={Dashboard} />
					</NativeRouter>
				</AuthContext.Provider>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: '#191C26'
	}
});

export default App;

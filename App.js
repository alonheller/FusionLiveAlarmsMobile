import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { NativeRouter, Route, Redirect, withRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext from './context/auth';
import SettingsContext from './context/settings';
import AuthenticatedUserContext from './context/authenticatedUser';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App: () => React$Node = (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [history, setHistory] = useState();

	useEffect(() => {
		if (authenticated) {
			history.push('/dashboard');
		}
	}, [authenticated]);

	const [isAuthorized, setIsAuthorized] = useState(false);
	const [server, setServer] = useState('');
	const authContextValue = { isAuthorized, setIsAuthorized, server, setServer };

	const [userId, setUserId] = useState(undefined);
	const [locationTagList, setLocationTagList] = useState([]);
	const [assetTagList, setAssetTagList] = useState([]);
	const [configMode, setConfigMode] = useState(false);
	const [hierarchyNav, setHierarchyNav] = useState(false);
	const [refreshInterval, setRefreshInterval] = useState(undefined);
	const [autoRefresh, setAutoRefresh] = useState(false);
	const [configDrawerMode, setConfigDrawerMode] = useState(undefined);
	const [darkMode, setDarkMode] = useState(false);

	const [authenticatedUser, setAuthenticatedUser] = useState({});
	const authenticatedUserValue = { authenticatedUser, setAuthenticatedUser };

	const settingsContextValue = {
		userId,
		setUserId,
		locationTagList,
		setLocationTagList,
		assetTagList,
		setAssetTagList,
		configMode,
		setConfigMode,
		hierarchyNav,
		setHierarchyNav,
		refreshInterval,
		setRefreshInterval,
		autoRefresh,
		setAutoRefresh,
		configDrawerMode,
		setConfigDrawerMode,
		darkMode,
		setDarkMode
	};

	return (
		<SafeAreaProvider>
			<StatusBar barStyle='dark-content' />
			<SafeAreaView style={styles.safeAreaView}>
				<AuthContext.Provider value={authContextValue}>
					<SettingsContext.Provider value={settingsContextValue}>
						<AuthenticatedUserContext.Provider value={authenticatedUserValue}>
							<NativeRouter>
								<Route exact path='/' component={Login} />
								<PrivateRoute path='/dashboard' component={Dashboard} />
								<PrivateRoute path='/settings' component={Settings} />
							</NativeRouter>
						</AuthenticatedUserContext.Provider>
					</SettingsContext.Provider>
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

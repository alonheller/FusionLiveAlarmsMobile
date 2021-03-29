import { createContext } from 'react';

const SettingsContext = createContext({
	userID: undefined,
	setUserId: () => {},
	locationTagList: [],
	setLocationTagList: () => [],
	assetTagList: [],
	setAssetTagList: () => [],
	configMode: false,
	setConfigMode: () => {},
	hierarchyNav: false,
	setHierarchyNav: () => {},
	refreshInterval: undefined,
	setRefreshInterval: () => {},
	autoRefresh: false,
	setAutoRefresh: () => {},
	configDrawerMode: undefined,
	setConfigDrawerMode: () => {},
	darkMode: false,
	setDarkMode: () => {}
});

export default SettingsContext;

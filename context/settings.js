import { createContext } from 'react';

const SettingsContext = createContext({
	settings: {},
	setSettings: () => {}
});

export default SettingsContext;

import { createContext } from 'react';

const AuthContext = createContext({
	isAuthorized: false,
	setIsAuthorized: () => {},
	server: '',
	setServer: () => {}
});

export default AuthContext;

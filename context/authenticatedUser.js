import { createContext } from 'react';

const AuthenticatedUserContext = createContext({
	authenticatedUser: undefined,
	setAuthenticatedUser: () => {}
});

export default AuthenticatedUserContext;

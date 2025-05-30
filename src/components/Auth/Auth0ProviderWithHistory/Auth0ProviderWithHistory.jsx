/*
  This file contains the Auth0 Provider component.
  It mainly uses Context to provide Auth0 states through the app. The Provider should be a children for <BrowserRouter>
  For example: https://developer.auth0.com/resources/guides/spa/react/basic-authentication/v17-javascript-react-router-5
*/

import React, { useMemo } from 'react';
import { Auth0Provider, Auth0Context } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import {
  auth0Domain, auth0ClientId, auth0Audience, testAuth0Env,
} from '../../../shared/keys';

// This is a mock Auth0Provider which does not provide real auth0 features, this is only for testing build
const TestAuth0Provider = ({ children }) => {
  const testAuth0Values = useMemo(() => ({
    // Mock all the values and functions that useAuth0 provides
    isAuthenticated: false,
    getAccessTokenSilently: async () => 'mock-token',
    loginWithPopup: () => console.log('Auth0: loginWithPopup called'),
    loginWithRedirect: () => console.log('Auth0: loginWithRedirect called'),
    logout: () => console.log('Auth0: logout called'),
  }), []);

  return (
    <Auth0Context.Provider value={testAuth0Values}>
      {children}
    </Auth0Context.Provider>
  );
};

const Auth0ProviderWithHistory = ({ children }) => {
  if (testAuth0Env) {
    return <TestAuth0Provider>{children}</TestAuth0Provider>;
  }

  const history = useHistory();
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  if (!(auth0Domain && auth0ClientId && auth0Audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        audience: auth0Audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      // solve the problem that Firefox is not auto login
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

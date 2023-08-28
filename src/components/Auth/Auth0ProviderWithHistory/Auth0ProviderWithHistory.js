/*
  This file contains the Auth0 Provider component.
  It mainly uses Context to provide Auth0 states through the app. The Provider should be a children for <BrowserRouter>
  For example: https://developer.auth0.com/resources/guides/spa/react/basic-authentication/v17-javascript-react-router-5
*/

import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth0Domain, auth0ClientId, auth0Audience } from '../../../shared/keys';

const Auth0ProviderWithHistory = ({ children }) => {
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
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

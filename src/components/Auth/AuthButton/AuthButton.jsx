/*
  This file contains the Button with authorization functions.
  The authorization functions includes Login, SignUp and LogOut, you can also define custom onClick callbacks and use it like a normal MUI Button.
*/

import { Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { PSAButton } from 'shared-react-components/src';

const AuthButton = ({
  type, variant = 'text', onClickCallback = () => {}, color = 'secondary',
}) => {
  const { loginWithRedirect, loginWithPopup, logout } = useAuth0();

  const handleLogin = async () => {
    if (window.Cypress) await loginWithRedirect();
    else await loginWithPopup();
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleClick = () => {
    switch (type) {
      case 'Login':
        return handleLogin();
      case 'Signup':
        return handleSignUp();
      case 'Logout':
        return handleLogout();
      default:
        return onClickCallback();
    }
  };

  return (
    <PSAButton
      variant={variant}
      onClick={handleClick}
      color={color}
      data-test="auth-btn"
      buttonType=""
      title={(
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {type}
        </Typography>
      )}
    />
  );
};

export default AuthButton;

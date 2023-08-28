/*
  This file contains the Button with authorization functions.
  The authorization functions includes Login, SignUp and LogOut, you can also define custom onClick callbacks and use it like a normal MUI Button.
*/

import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { userLogout } from '../../../reduxStore/userSlice';

const AuthButton = ({
  type, variant = 'text', onClickCallback = () => {}, color = 'primary',
}) => {
  const { dispatch } = useDispatch();
  const { loginWithRedirect, logout } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
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
    }).then(dispatch(userLogout()));
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
    <Button variant={variant} onClick={handleClick} color={color}>
      {type}
    </Button>
  );
};

export default AuthButton;

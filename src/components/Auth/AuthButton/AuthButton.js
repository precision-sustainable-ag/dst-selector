import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { userLogout } from '../../../reduxStore/userSlice';

const AuthButton = ({
  type, variant = 'text', onClickCallback = () => {}, isAnchor = false,
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
    <Button variant={variant} onClick={handleClick} component={isAnchor ? 'a' : null}>
      {type}
    </Button>
  );
};

export default AuthButton;

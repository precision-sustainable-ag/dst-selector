import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../reduxStore/userSlice';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { dispatch } = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <a href="/" onClick={handleLogout}>
      LOG OUT
    </a>
  );
};

export default LogoutButton;

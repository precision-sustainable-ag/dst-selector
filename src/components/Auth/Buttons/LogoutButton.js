import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
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

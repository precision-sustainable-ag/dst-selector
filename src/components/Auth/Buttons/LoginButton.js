import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <Button variant="outlined" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default LoginButton;

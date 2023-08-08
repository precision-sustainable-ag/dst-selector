import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <Button variant="outlined" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};

export default SignUpButton;

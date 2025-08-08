/*
  Improved login/signup popup with a more appealing message.
*/

import {
  Box, Typography, Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PSAModal } from 'shared-react-components/src';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';

const localStorageKey = 'notShowAuth';

const AuthModal = ({ modalOpen, setModalOpen, setConsentModalOpen }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) !== null) {
      const { expiredAt } = JSON.parse(localStorage.getItem(localStorageKey));
      if (new Date().getTime() < expiredAt) {
        setModalOpen(false);
      }
    }
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: {
      xs: '90%', sm: '80%', md: '80%', lg: '80%', xl: '80%',
    },
    minWidth: {
      xs: '90%', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto',
    },
    marginTop: '15px',
    marginBottom: '15px',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: {
      xs: 3, sm: 3, md: 4, lg: 5, xl: 5,
    },
  };

  const handleModal = () => {
    const authObject = {
      expiredAt: new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(authObject));
    setModalOpen((open) => !open);
    setConsentModalOpen(true);
  };

  return (
    (!isAuthenticated && !isLoading)
    && (
    <PSAModal
      open={modalOpen}
      closeAfterTransition
      onClose={handleModal}
      modalContent={(
        <Box sx={style}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Unlock Exclusive Features!
          </Typography>
          <Typography variant="body1" mb={2}>
            Sign in to access your personalized history and seamless cross-device experience.
            Your data is safe with us!
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <AuthButton variant="contained" type="Login" />
            </Grid>
            <Grid item>
              <AuthButton variant="outlined" type="Signup" />
            </Grid>
            <Grid item>
              <AuthButton variant="outlined" type="Not now" onClickCallback={handleModal} />
            </Grid>
          </Grid>
        </Box>
      )}
    />
    )
  );
};

export default AuthModal;

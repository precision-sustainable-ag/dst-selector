/*
  This is the popup modal asking for user login/signup.
*/

import {
  Modal, Box, Typography, Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
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
    maxWidth: '80%',
    marginTop: '15px',
    marginBottom: '15px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleModal = () => {
    const authObject = {
      // set not show auth modal time as 14 days
      expiredAt: new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(authObject));
    setModalOpen((open) => !open);
    setConsentModalOpen(true);
  };

  return (
    (!isAuthenticated && !isLoading)
    && (
    <Modal
      open={modalOpen}
      closeAfterTransition
      onClose={handleModal}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Login to try out our new user history feature?
        </Typography>
        <Typography variant="body">
          We will not share your data.
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <AuthButton variant="outlined" type="Login" />
          </Grid>
          <Grid item>
            <AuthButton variant="outlined" type="Signup" />
          </Grid>
          <Grid item>
            <AuthButton variant="text" type="Not now" color="error" onClickCallback={handleModal} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
    )
  );
};
export default AuthModal;

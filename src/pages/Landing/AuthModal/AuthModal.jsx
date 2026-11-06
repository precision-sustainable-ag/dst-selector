/*
  Improved login/signup popup with a more appealing message.
*/

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { PSAModal } from 'shared-react-components/src';
import AuthButton from '../../../components/Auth/AuthButton/AuthButton';

const localStorageKey = 'notShowAuth';

const modalPaperStyles = {
  width: {
    xs: '90%',
    sm: '80%',
    md: '600px',
  },
  maxWidth: '90%',
  borderRadius: '12px',
  p: {
    xs: 3,
    sm: 3,
    md: 4,
    lg: 5,
  },
};

const AuthModal = ({ modalOpen, setModalOpen, setConsentModalOpen }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) !== null) {
      const { expiredAt } = JSON.parse(localStorage.getItem(localStorageKey));
      if (Date.now() < expiredAt) {
        setModalOpen(false);
      }
    }
  }, [setModalOpen]);

  const handleModal = () => {
    const authObject = {
      expiredAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(authObject));
    setModalOpen((open) => !open);
    setConsentModalOpen(true);
  };

  return (
    !isAuthenticated &&
    !isLoading && (
      <PSAModal
        open={modalOpen}
        closeAfterTransition
        onClose={handleModal}
        paperProps={{ sx: modalPaperStyles }}
        modalContent={
          <Box sx={{ mt: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Unlock Exclusive Features!
            </Typography>
            <Typography variant="body1" mb={2}>
              Sign in to access your personalized history and seamless cross-device experience. Your
              data is safe with us!
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid>
                <AuthButton variant="contained" type="Login" />
              </Grid>
              <Grid>
                <AuthButton variant="outlined" type="Signup" />
              </Grid>
              <Grid>
                <AuthButton variant="outlined" type="Not now" onClickCallback={handleModal} />
              </Grid>
            </Grid>
          </Box>
        }
      />
    )
  );
};

export default AuthModal;

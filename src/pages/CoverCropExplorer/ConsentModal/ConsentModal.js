import {
  Modal, Box, Typography, Button, Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateConsent } from '../../../reduxStore/userSlice';

const localStorageKey = 'consent';

const ConsentModal = ({ modalOpen, setModalOpen }) => {
  const dispatchRedux = useDispatch();

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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: {
      xs: 2, sm: 2, md: 3, lg: 4, xl: 4,
    },
  };

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) !== null) {
      const { expiredAt } = JSON.parse(localStorage.getItem(localStorageKey));
      if (new Date().getTime() < expiredAt) {
        setModalOpen(false);
      }
    }
  }, []);

  const handleModal = (choice) => {
    const consentObject = {
      choice,
      // set user consent selection time as 180 days
      expiredAt: new Date().getTime() + 180 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(consentObject));
    dispatchRedux(updateConsent(choice, new Date().toISOString()));
    setModalOpen((o) => !o);
  };

  return !/crop=/.test(window.location.search) && (
    <Modal
      open={modalOpen}
      closeAfterTransition
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Your Privacy
        </Typography>
        <Typography variant="body">
          <p>
            This site uses cookies for Google Analytics to improve user experience and analyze
            website traffic. No personally identifiable data is collected.
          </p>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            By clicking "Accept", you agree to our website's cookie use as described in our
            {' '}
            <a
              href="https://northeastcovercrops.com/privacy-policy/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </p>
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={() => handleModal(true)}>
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => handleModal(false)}>
              Decline
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConsentModal;

import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PSAButton, PSAModal } from 'shared-react-components/src';
import { updateConsent } from '../../../reduxStore/userSlice';

const localStorageKey = 'consent';

const modalPaperStyles = {
  width: {
    xs: '90%',
    sm: '80%',
    md: '600px',
  },
  maxWidth: '90%',
  p: {
    xs: 2,
    sm: 3,
    md: 4,
  },
};

const ConsentModal = ({ modalOpen, setModalOpen }) => {
  const dispatchRedux = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(localStorageKey) !== null) {
      const { expiredAt } = JSON.parse(localStorage.getItem(localStorageKey));
      if (Date.now() < expiredAt) {
        setModalOpen(false);
      }
    }
  }, [setModalOpen]);

  const handleModal = (choice) => {
    const consentObject = {
      choice,
      // set user consent selection time as 180 days
      expiredAt: Date.now() + 180 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(consentObject));
    dispatchRedux(updateConsent(choice, new Date().toISOString()));
    setModalOpen((o) => !o);
  };

  return (
    !/crop=/.test(window.location.search) && (
      <PSAModal
        open={modalOpen}
        closeAfterTransition
        onClose={() => handleModal(false)}
        paperProps={{ sx: modalPaperStyles }}
        modalContent={
          <Box sx={{ mt: 1 }}>
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
                By clicking "Accept", you agree to our website's cookie use as described in our{' '}
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
              <Grid>
                <PSAButton
                  variant="outlined"
                  onClick={() => handleModal(true)}
                  title="Accept"
                  buttonType=""
                />
              </Grid>
              <Grid>
                <PSAButton
                  variant="outlined"
                  onClick={() => handleModal(false)}
                  title="Decline"
                  buttonType=""
                />
              </Grid>
            </Grid>
          </Box>
        }
      />
    )
  );
};

export default ConsentModal;

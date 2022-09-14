/*
  This file contains the ExplorerCardView component, and styles
  The ExplorerCardView component is the card that contains a single crop in the crop explorer
  Styles are created using makeStyles
*/

import {
  Modal, Box, Typography, Button, Grid,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Context } from '../../store/Store';

const ExplorerCardView = (props) => {
  const { consent } = props;
  const { dispatch } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(true);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleModalAccept = () => {
    // toggle modal open
    setModalOpen((o) => !o);
    dispatch({
      type: 'UPDATE_CONSENT',
      data: {
        consent: true,
      },
    });
  };

  const handleModalDecline = () => {
    // toggle modal open
    setModalOpen((o) => !o);
    dispatch({
      type: 'UPDATE_CONSENT',
      data: {
        consent: false,
      },
    });
  };

  return !consent && !/crop=/.test(window.location.search) && (
    <Modal
      open={modalOpen}
      //   onClose={toggleModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            <Button variant="outlined" onClick={handleModalAccept}>
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleModalDecline}>
              Decline
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ExplorerCardView;

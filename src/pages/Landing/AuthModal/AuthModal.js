import {
  Modal, Box, Typography, Button, Grid,
} from '@mui/material';
import React from 'react';
import LoginButton from '../../../components/Auth/Buttons/LoginButton';
import SignUpButton from '../../../components/Auth/Buttons/SignUpButton';

const AuthModal = ({ modalOpen, setModalOpen }) => {
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

  const handleModal = () => {
    setModalOpen((o) => !o);
  };

  return (
    <Modal
      open={modalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login to try out our new user history feature?
        </Typography>
        <Typography variant="body">
          <p>
            We will not share your data.
          </p>
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <LoginButton />
          </Grid>
          <Grid item>
            <SignUpButton />
          </Grid>
          <Grid item>
            <Button variant="text" onClick={handleModal}>
              Not now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default AuthModal;

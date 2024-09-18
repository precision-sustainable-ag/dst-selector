/*
  This file contains the Modal Component
*/

import React from 'react';
import { Modal } from '@mui/material';

const PSAModal = ({
  modalContent, sx, style, open, onClose, closeAfterTransition, disableEscapeKeyDown,
}) => (
  <Modal
    sx={sx}
    open={open}
    style={style}
    onClose={onClose}
    closeAfterTrantion={closeAfterTransition}
    disableEscapeKeyDown={disableEscapeKeyDown}
  >
    {modalContent}

  </Modal>
);

export default PSAModal;

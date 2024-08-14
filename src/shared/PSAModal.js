/*
  This file contains the Modal Component
*/

import React from 'react';
import { Modal } from '@mui/material';

const PSAModal = ({
  data, sx, style, open, onClose, closeAfterTransition, disableEscapeKeyDown,
}) => (
  <Modal
    sx={sx}
    open={open}
    style={style}
    onClose={onClose}
    closeAfterTrantion={closeAfterTransition}
    disableEscapeKeyDown={disableEscapeKeyDown}
  >
    {data}

  </Modal>
);

export default PSAModal;

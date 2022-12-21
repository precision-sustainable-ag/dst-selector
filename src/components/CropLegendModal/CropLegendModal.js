/*
  This file contains the CropLegendModal and it's styles
  The CropLegendModal shows the color legend for the calendar view
  Styles are created using makeStyles
*/

import {
  Button,
  Modal,
  Typography,
  Box,
} from '@mui/material';
// import makeStyles from '@mui/styles/makeStyles';
import { CloseRounded, FiberManualRecord } from '@mui/icons-material';
import React from 'react';

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: '1em',
//     width: '30%',
//   },
// }));

const CropLegendModal = ({ legendModal, handleLegendModal }) => (
  <Modal
    open={legendModal}
    onClose={handleLegendModal}
    // className={classes.modal}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      className="modalLegendPaper"
      sx={{
        backgroundColor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 5,
        padding: '1em',
        width: '30%',
      }}
    >
      <div className="row">
        <div className="col-6">
          <Typography variant="h4">LEGEND</Typography>
        </div>
        <div className="col-6 text-right">
          <Button onClick={handleLegendModal}>
            <CloseRounded />
          </Button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 legendModalRow">
          <Typography variant="body1">
            <FiberManualRecord className="reliable" />
            <span className="pl-3">Reliable Establishment</span>
          </Typography>
        </div>
        <div className="col-12 legendModalRow">
          <Typography variant="body1">
            <FiberManualRecord className="temperatureRisk" />
            <span className="pl-3">Temperature Risk To Establishment</span>
          </Typography>
        </div>
        <div className="col-12 legendModalRow">
          <Typography variant="body1">
            <FiberManualRecord className="frostPossible" />
            <span className="pl-3">Frost Seeding Possible</span>
          </Typography>
        </div>
        <div className="col-12 legendModalRow">
          <Typography variant="body1">
            <FiberManualRecord className="cashCrop" />
            <span className="pl-3">Previous Cash Crop Growth Window</span>
          </Typography>
        </div>
      </div>
    </Box>
  </Modal>
);

export default CropLegendModal;

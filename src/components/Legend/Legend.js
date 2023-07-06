/*
  This file contains the CropLegendModal and it's styles
  The CropLegendModal shows the color legend for the calendar view
*/

import {
  Button,
  Typography,
} from '@mui/material';
import { CloseRounded, FiberManualRecord } from '@mui/icons-material';
import React from 'react';

const Legend = ({ handleLegendModal, legendData, modal }) => (
  <>
    {modal
      && (
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
      )}

    <div className="row">
      {legendData.length > 0
      && legendData.map((item) => (
        <div className="col-12 legendModalRow">
          <Typography variant="body1">
            <FiberManualRecord className={`${item.className}`} />
            <span className="pl-3">{`${item.label}`}</span>
          </Typography>
        </div>
      ))}
    </div>
    {/*
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
    </div> */}
  </>
);

export default Legend;

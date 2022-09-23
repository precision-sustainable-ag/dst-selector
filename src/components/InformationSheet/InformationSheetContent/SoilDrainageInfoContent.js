import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, useStyles } from './informationSheet.styles';
import SoilDrainageTimeline from '../SoilDrainageTimeline';

const SoilDrainageInfoContent = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-5 col-lg-6 basicAgWrapper">
      <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em', float: 'left' }}>
        <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
          <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
            <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
              Soil Drainage
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="col-12 text-right">
              <SoilDrainageTimeline drainage={crop['Soil Drainage']} />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default SoilDrainageInfoContent;

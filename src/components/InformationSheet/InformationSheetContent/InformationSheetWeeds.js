import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from './informationSheet.styles';
import TooltipMaker from '../TooltipMaker';

const InfoWeeds = ({ attribute, crop }) => (
  <>
    <div className="col-9 mb-2">
      <TooltipMaker variable={attribute} zone={crop.Zone}>
        <Typography variant="body1">{attribute}</Typography>
      </TooltipMaker>
    </div>
    <div className="mb-2">{getRating(crop[attribute])}</div>
  </>
); // InfoWeeds

const InformationSheetWeeds = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-7 col-lg-6 weedsRowWrapper" style={{ marginTop: '1em' }}>
      <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
        <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2 text-uppercase">
              Weeds
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row col-12 text-right">
            <InfoWeeds crop={crop} attribute="Residue Suppresses Summer Annual Weeds" />
            <InfoWeeds crop={crop} attribute="Outcompetes Summer Annual Weeds" />
            <InfoWeeds crop={crop} attribute="Suppresses Winter Annual Weeds" />
            <InfoWeeds crop={crop} attribute="Persistence" />
            <InfoWeeds crop={crop} attribute="Volunteer Establishment" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InformationSheetWeeds;

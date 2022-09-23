import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from './informationSheet.styles';
import TooltipMaker from '../TooltipMaker';

const InfoEnvironmentalTermination = ({
  attribute,
  text = attribute.replace(/\bat\b/, 'At'),
  variable,
  crop,
}) => (
  <>
    <div className="col-8 mb-2">
      <TooltipMaker variable={variable} zone={crop.Zone}>
        <Typography variant="body1">{text}</Typography>
      </TooltipMaker>
    </div>
    <div className="mb-2">{getRating(crop[attribute])}</div>
  </>
); // InfoEnvironmentalTermination

const InformationSheetEnvironment = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-5 col-lg-6 envTolWrapper" style={{ marginTop: '1em' }}>
      <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
        <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
          <div className="col-12 otherHeaderRow p-0">
            <Typography variant="h6" className="px-3 py-2 text-uppercase">
              Environmental&nbsp;Tolerances
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row col-12 text-right">
            <InfoEnvironmentalTermination
              attribute="Low Fertility"
              variable="Low Fertility Tolerance"
              crop={crop}
            />
            <InfoEnvironmentalTermination
              crop={crop}
              attribute="Drought"
              variable="Drought Tolerance"
            />
            <InfoEnvironmentalTermination crop={crop} attribute="Heat" variable="Heat Tolerance" />
            <InfoEnvironmentalTermination
              crop={crop}
              attribute="Shade"
              variable="Shade Tolerance"
            />
            <InfoEnvironmentalTermination
              crop={crop}
              attribute="Flood"
              variable="Flood Tolerance"
            />
            <InfoEnvironmentalTermination
              crop={crop}
              attribute="Salinity"
              variable="Salinity Tolerance"
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InformationSheetEnvironment;

import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoEnvironmentalTermination = ({
  attribute,
  text = attribute.replace(/\bat\b/, 'At'),
  variable,
  crop,
}) => (
  <>
    <div className="col-7 mb-2">
      <TooltipMaker variable={variable} zone={crop.Zone}>
        <Typography variant="body1">{text}</Typography>
      </TooltipMaker>
    </div>
    <div className="mb-2">{getRating(crop[attribute])}</div>
  </>
); // InfoEnvironmentalTermination

const TerminationInfo = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-5 col-lg-6 basicAgWrapper">
      <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
        <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
          <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
            <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
              Termination
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row col-12 text-left">
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Tillage at Vegetative"
                variable="Tillage Termination at Vegetative"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Tillage at Flowering"
                variable="Tillage Termination at Flowering"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Freezing at Vegetative"
                variable="Freezing Termination at Vegetative"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Freezing at Flowering"
                variable="Freezing Termination at Flowering"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Chemical at Vegetative"
                variable="Chemical Termination at Vegetative"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Chemical at Flowering"
                variable="Chemical Termination at Flowering"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Mow at Flowering"
                variable="Mow Termination at Flowering"
              />
              <InfoEnvironmentalTermination
                crop={crop}
                attribute="Roller Crimp Termination at Flowering"
                text="Roller-Crimp At Flowering"
                variable="Roller Crimp Termination at Flowering"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default TerminationInfo;

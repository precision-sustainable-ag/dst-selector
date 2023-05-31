import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoEnvironmentalTermination = ({
  attribute,
  text = attribute.replace(/\bat\b/, 'At'),
  variable,
  crop,
}) => (
  <>
    <Box
      className="col-6 mb-2 ml-4"
      sx={{
        paddingLeft: {
          xs: '50px',
          sm: '0px',
          md: '50px',
          lg: '0px',
          xl: '50px',
        },
      }}
    >
      <TooltipMaker variable={variable} zone={crop.Zone}>
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
          variant="body1"
        >
          {text}
        </Typography>
      </TooltipMaker>
    </Box>
    <Box
      className="mb-2"
      sx={{
        paddingLeft: {
          xs: '50px',
          sm: '50px',
          md: '50px',
          lg: '10%',
          xl: '20%',
        },
      }}
    >
      {getRating(crop[variable].values[0])}
    </Box>
  </>
); // InfoEnvironmentalTermination

const TerminationInfo = ({ crop }) => (
  <div className="col-lg-12 col-xl-6 basicAgWrapper">
    <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
      <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            '&$expanded': {
              margin: '4px 0',
            },
          }}
        >
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

export default TerminationInfo;

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
          lg: '25%',
          xl: '20%',
        },
      }}
    >
      {getRating(crop[attribute])}
    </Box>
  </>
); // InfoEnvironmentalTermination

const InformationSheetEnvironment = ({ crop }) => (
  <div className="col-5 col-lg-6 envTolWrapper" style={{ marginTop: '1em' }}>
    <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        // classes={{ expanded: classes.expanded }}
        sx={{
          '&$expanded': {
            margin: '4px 0',
          },
        }}
      >
        <div className="col-12 otherHeaderRow p-0">
          <Typography variant="h6" className="px-3 py-2 text-uppercase">
            Environmental Tolerances
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row col-12 text-left">
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
          <InfoEnvironmentalTermination crop={crop} attribute="Shade" variable="Shade Tolerance" />
          <InfoEnvironmentalTermination crop={crop} attribute="Flood" variable="Flood Tolerance" />
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

export default InformationSheetEnvironment;

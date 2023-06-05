import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoEnvironmentalTermination = ({
  attribute,
  text = attribute.replace(/\bat\b/, 'At'),
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
      <TooltipMaker zone={crop.Zone}>
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
      {getRating(crop[attribute].values[0])}
    </Box>
  </>
); // InfoEnvironmentalTermination

const InformationSheetEnvironment = ({ crop, zone }) => (
  <div className="col-lg-12 col-xl-6 envTolWrapper" style={{ marginTop: '1em' }}>
    <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
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
            attribute="Low Fertility Tolerance"
            crop={crop}
            zone={zone}
          />
          <InfoEnvironmentalTermination
            crop={crop}
            attribute="Drought Tolerance"
            zone={zone}
          />
          <InfoEnvironmentalTermination crop={crop} attribute="Heat Tolerance" zone={zone} />
          <InfoEnvironmentalTermination crop={crop} attribute="Shade Tolerance" zone={zone} />
          <InfoEnvironmentalTermination crop={crop} attribute="Flood Tolerance" zone={zone} />
          <InfoEnvironmentalTermination
            crop={crop}
            attribute="Salinity Tolerance"
            zone={zone}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  </div>
);

export default InformationSheetEnvironment;

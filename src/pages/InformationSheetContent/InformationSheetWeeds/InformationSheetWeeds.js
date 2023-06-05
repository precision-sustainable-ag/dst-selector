import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoWeeds = ({ attribute, crop, zone }) => (
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
      <TooltipMaker variable={attribute} zone={zone}>
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
          variant="body1"
        >
          {attribute}
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
      {getRating(crop[attribute].values[0])}
    </Box>
  </>
); // InfoWeeds

const InformationSheetWeeds = ({ crop, zone }) => (
  <div className="col-lg-12 col-xl-6 weedsRowWrapper" style={{ marginTop: '1em' }}>
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
            Weeds
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row col-12 text-left">
          <InfoWeeds crop={crop.data.Goals} zone={zone} attribute="Residue Suppresses Summer Annual Weeds" />
          <InfoWeeds crop={crop.data.Goals} zone={zone} attribute="Outcompetes Summer Annual Weeds" />
          <InfoWeeds crop={crop.data.Goals} zone={zone} attribute="Suppresses Winter Annual Weeds" />
          <InfoWeeds crop={crop.data.Weeds} zone={zone} attribute="Persistence" />
          <InfoWeeds crop={crop.data.Weeds} zone={zone} attribute="Volunteer Establishment" />
        </div>
      </AccordionDetails>
    </Accordion>
  </div>
);

export default InformationSheetWeeds;

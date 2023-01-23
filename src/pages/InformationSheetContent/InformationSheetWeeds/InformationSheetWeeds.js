import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoWeeds = ({ attribute, crop }) => (
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
      <TooltipMaker variable={attribute} zone={crop.Zone}>
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
      {getRating(crop[attribute])}
    </Box>
  </>
); // InfoWeeds

const InformationSheetWeeds = ({ crop }) => (
  <div className="col-6 col-xs-12 col-sm-12 col-md-12 col-lg-6 weedsRowWrapper" style={{ marginTop: '1em' }}>
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

export default InformationSheetWeeds;

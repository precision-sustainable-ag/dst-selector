import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { RenderSeedPriceIcons } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const PlantingTrait = ({
  attribute,
  text = attribute.replace(/\bat\b/, 'At'),
  crop,
  variable,
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
      <TooltipMaker variable={attribute} zone={crop.Zone}>
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
          md: '5px',
          lg: '10%',
          xl: '20%',
        },
      }}
    >
      {/* {typeof crop[attribute] !== 'number' ? (
        <Typography variant="body1">
          {crop[attribute] === undefined || attribute === 'Inoculant Type'
            ? variable
            : crop[attribute].toString()}
        </Typography>
      ) : (
        <Typography variant="body1">variable</Typography>
      )} */}
      { crop[attribute]?.dataType !== 'number' ? (
        <Typography variant="body1">
          {crop[attribute] === undefined || attribute === 'Inoculant Type'
            ? variable
            : crop[attribute].values[0].toString()}
        </Typography>
      ) : (
        <Typography variant="body1">variable</Typography>
      )}
    </Box>
  </>
);

const InformationSheetPlanting = ({ crop }) => (
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
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h6"
            className="px-3 py-2"
            style={{ border: '0px' }}
          >
            Planting
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row col-12 text-left">
            <PlantingTrait
              crop={crop.data.Planting}
              attribute="Seeds Per Lb"
              variable={<Typography variant="body1">{crop.data.Planting['Seeds per Pound'].values[0]}</Typography>}
            />

            <PlantingTrait
              crop={crop.data.Planting}
              attribute="Seed Price Per Lb"
              variable={<RenderSeedPriceIcons val={crop.data.Planting['Seed Price per Pound'].values[0]} />}
            />

            <PlantingTrait
              crop={crop.data.Planting}
              attribute="Base Seeding Rate (Lbs/A)"
              variable={
                `${crop.data.Planting['Base Seeding Rate Min (lbs/A)'].values[0]} 
                - ${crop.data.Planting['Base Seeding Rate Max (lbs/A)'].values[0]}`
              }
            />

            <PlantingTrait
              crop={crop.data.Planting}
              attribute="Drilled Depth"
              variable={
                `${crop.data.Planting['Drilled Depth Min'].values[0]} 
                - ${crop.data.Planting['Drilled Depth Max'].values[0]}`
              }
            />

            <PlantingTrait
              crop={crop}
              attribute="Can Aerial Seed"
              variable={crop['Aerial Seeding'] ? 'Yes' : 'No'}
            />

            <PlantingTrait
              crop={crop}
              attribute="Can Frost Seed"
              variable={crop['Frost Seeding'] ? 'Yes' : 'No'}
            />

            <PlantingTrait
              crop={crop.data.Planting}
              attribute="Min Germination Temp (&deg;F)"
              variable={crop.data.Planting['Min Germination Temp (F)'].values[0]}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  </div>
);

export default InformationSheetPlanting;

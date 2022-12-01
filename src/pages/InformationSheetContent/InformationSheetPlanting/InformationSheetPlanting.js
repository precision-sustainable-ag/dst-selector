import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { RenderSeedPriceIcons } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';
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
          xs: '50px', sm: '0px', md: '50px', lg: '0px', xl: '50px',
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
          xs: '50px', sm: '50px', md: '5px', lg: '10%', xl: '20%',
        },
      }}
    >
      {typeof crop[attribute] !== 'number'
        ? (

          <Typography variant="body1">
            {crop[attribute] === undefined || attribute === 'Inoculant Type' ? variable : crop[attribute].toString()}
          </Typography>
        )
        : (
          <Typography variant="body1">
            variable
          </Typography>
        )}
    </Box>
  </>
);

const InformationSheetPlanting = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-7 col-lg-6 basicAgWrapper">
      <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
        <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
          <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
              Planting
            </Typography>
          </AccordionSummary>
          <AccordionDetails>

            <div className="row col-12 text-left">
              <PlantingTrait
                crop={crop}
                attribute="Seeds Per Lb"
                variable={<Typography variant="body1">{crop['Seeds per Pound']}</Typography>}
              />

              <PlantingTrait
                crop={crop}
                attribute="Seed Price Per Lb"
                variable={<RenderSeedPriceIcons val={crop['Seed Price per Pound']} />}
              />

              <PlantingTrait
                crop={crop}
                attribute="Base Seeding Rate (Lbs/A)"
                variable={`${crop['Base Seeding Rate Min (lbs/A)']} - ${crop['Base Seeding Rate Max (lbs/A)']}`}
              />

              <PlantingTrait
                crop={crop}
                attribute="Drilled Depth"
                variable={`${crop['Drilled Depth Min']}" - ${crop['Drilled Depth Max']}"`}
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
                crop={crop}
                attribute="Min Germination Temp (&deg;F)"
                variable={crop['Min Germination Temp (F)']}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default InformationSheetPlanting;

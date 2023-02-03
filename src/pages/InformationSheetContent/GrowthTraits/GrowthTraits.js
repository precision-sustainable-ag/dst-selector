import React from 'react';
import { AccordionDetails, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const GrowthTrait = ({
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
          md: '50px',
          lg: '10%',
          xl: '20%',
        },
      }}
    >
      {typeof crop[attribute] !== 'number' ? (
        <Typography variant="body1">
          {crop[attribute] === undefined || attribute === 'Inoculant Type'
            ? variable
            : crop[attribute].toString()}
        </Typography>
      ) : (
        <>{getRating(crop[attribute])}</>
      )}
    </Box>
  </>
); // InfoEnvironmentalTermination

const GrowthTraits = ({ crop }) => (
  // const classes = useStyles();
  <div className="col-lg-12 col-xl-6 basicAgWrapper">
    <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em', float: 'left' }}>
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
            Growth Traits
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row col-12 text-left">
            <GrowthTrait crop={crop} attribute="Duration" />
            <GrowthTrait crop={crop} attribute="Zone Use" />
            <GrowthTrait crop={crop} attribute="Shape & Orientation" />
            <GrowthTrait
              crop={crop}
              attribute="Dry Matter (Lbs/A/Yr)"
              variable={`${crop['Dry Matter Min (lbs/A/y)']} - ${crop['Dry Matter Max (lbs/A/y)']}`}
            />
            <GrowthTrait
              crop={crop}
              attribute="Soil Textures"
              variable={crop['Soil Textures']?.map((val, index) => (
                <Typography className="text-capitalize" key={index} variant="body1">
                  {val}
                </Typography>
              ))}
            />
            <GrowthTrait
              crop={crop}
              attribute="Soil pH"
              variable={`${crop['Minimum Tolerant Soil pH']} - ${crop['Maximum Tolerant Soil pH']}`}
            />
            <GrowthTrait crop={crop} attribute="Soil Moisture Use" />
            <GrowthTrait
              crop={crop}
              attribute="Hessian Fly Free Date"
              variable={crop['Hessian Fly Free Date'] ? crop['Hessian Fly Free Date'] : 'No'}
            />

            {crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)'] > 0 && (
              <GrowthTrait
                crop={crop}
                attribute="Nitrogen Accumulation (Lbs/A/Yr)"
                variable={`${crop['Nitrogen Accumulation Min, Legumes (lbs/A/y)']} - ${crop['Nitrogen Accumulation Max, Legumes (lbs/A/y)']}`}
              />
            )}

            <GrowthTrait crop={crop} attribute="Ease of Establishment" />
            <GrowthTrait crop={crop} attribute="Establishes Quickly" />
            <GrowthTrait crop={crop} attribute="Early Spring Growth" />
            <GrowthTrait
              crop={crop}
              attribute="Flowering Trigger"
              variable={crop['Flowering Trigger']?.map((val, index) => (
                <Typography className="text-capitalize" key={index} variant="body1">
                  {val}
                </Typography>
              ))}
            />
            <GrowthTrait crop={crop} attribute="Root Depth" />

            {crop['Inoculant Type'][0] !== 'none' && (
              <GrowthTrait
                crop={crop}
                attribute="Inoculant Type"
                variable={crop['Inoculant Type']?.map((val, index) => (
                  <Typography className="text-capitalize" key={index} variant="body1">
                    {val}
                  </Typography>
                ))}
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  </div>
);

export default GrowthTraits;

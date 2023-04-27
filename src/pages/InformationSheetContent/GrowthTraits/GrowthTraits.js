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
      <TooltipMaker variable={attribute}>
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
      { crop[attribute]?.dataType !== 'number' ? (
        <Typography variant="body1">
          {crop[attribute] === undefined || attribute === 'Inoculant Type'
            ? variable
            : crop[attribute].values[0].toString()}
        </Typography>
      ) : (
        <>{getRating(crop[attribute].values[0])}</>
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
            <GrowthTrait crop={crop.data['Basic Agronomics']} attribute="Duration" />
            <GrowthTrait crop={crop.data['Basic Agronomics']} attribute="Zone Use" />
            <GrowthTrait crop={crop.data['Basic Agronomics']} attribute="Shape & Orientation" />

            <GrowthTrait
              crop={crop.data['Basic Agronomics']}
              attribute="Dry Matter (Lbs/A/Yr)"
              variable={
                `${crop.data['Basic Agronomics']['Dry Matter Min (lbs/A/y)'].values[0]}
                - ${crop.data['Basic Agronomics']['Dry Matter Max (lbs/A/y)'].values[0]}`
              }
            />

            <GrowthTrait
              crop={crop.data['Soil Conditions']}
              attribute="Soil Textures"
              variable={crop.data['Soil Conditions']['Soil Textures'].values?.map((val, index) => (
                <Typography className="text-capitalize" key={index} variant="body1">
                  {val}
                </Typography>
              ))}
            />

            <GrowthTrait
              crop={crop.data['Soil Conditions']}
              attribute="Soil pH"
              variable={
                `${crop.data['Soil Conditions']['Minimum Tolerant Soil pH'].values[0]}
                - ${crop.data['Soil Conditions']['Maximum Tolerant Soil pH'].values[0]}`
              }
            />

            <GrowthTrait crop={crop.data['Soil Conditions']} attribute="Soil Moisture Use" />

            {/* <GrowthTrait
              crop={crop.data.}
              attribute="Hessian Fly Free Date"
              variable={crop['Hessian Fly Free Date'] ? crop['Hessian Fly Free Date'] : 'No'}
            /> */}

            {crop.data['Basic Agronomics']['Nitrogen Accumulation Max, Legumes (lbs/A/y)'].values[0] > 0 && (
              <GrowthTrait
                crop={crop.data['Basic Agronomics']}
                attribute="Nitrogen Accumulation (Lbs/A/Yr)"
                variable={
                  `${crop.data['Basic Agronomics']['Nitrogen Accumulation Min, Legumes (lbs/A/y)'].values[0]}
                  - ${crop.data['Basic Agronomics']['Nitrogen Accumulation Max, Legumes (lbs/A/y)'].values[0]}`
                }
              />
            )}

            <GrowthTrait crop={crop.data.Growth} attribute="Ease of Establishment" />
            <GrowthTrait crop={crop.data.Growth} attribute="Establishes Quickly" />
            <GrowthTrait crop={crop.data.Growth} attribute="Early Spring Growth" />
            <GrowthTrait
              crop={crop.data.Growth}
              attribute="Flowering Trigger"
              variable={crop.data.Growth['Flowering Trigger'].values?.map((val, index) => (
                <Typography className="text-capitalize" key={index} variant="body1">
                  {val}
                </Typography>
              ))}
            />
            <GrowthTrait crop={crop.data.Growth} attribute="Root Depth" />

            {crop.data.Growth['Inoculant Type'].values[0] !== 'none' && (
              <GrowthTrait
                crop={crop.data.Growth}
                attribute="Inoculant Type"
                variable={crop.data.Growth['Inoculant Type'].values[0]?.map((val, index) => (
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

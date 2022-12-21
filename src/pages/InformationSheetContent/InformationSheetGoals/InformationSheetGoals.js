import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InfoGoals = ({ crop, attribute, alternate }) => {
  if (crop[attribute]) {
    return (
      <div className="col-6 mb-2 ml-1 row">
        <span className="col">
          <TooltipMaker variable={attribute} zone={crop.Zone}>
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              {attribute}
            </Typography>
          </TooltipMaker>
        </span>
        <span>{getRating(crop[attribute] || crop[alternate])}</span>
      </div>
    );
  }
  return (
    <div className="col-6 mb-2 ml-1 row">
      <span className="col">
        <TooltipMaker variable={attribute} zone={crop.Zone}>
          <Typography sx={{ fontWeight: 'bold' }} variant="body1">
            {attribute}
          </Typography>
        </TooltipMaker>
      </span>
      <Typography style={{ marginRight: '6%' }} variant="body1">
        N/A
      </Typography>
    </div>
  );
};

const InformationSheetGoals = ({ crop, cropZone, cropGrowingWindow }) => (
  <div className="row mt-2 coverCropGoalsWrapper avoidPage">
    <div className="col-12 basicAgWrapper">
      <div className="col-12 p-0">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              '&$expanded': {
                margin: '4px 0',
              },
            }}
          >
            <Typography variant="h6" className="text-uppercase px-3 py-2">
              Goals
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row col-12 text-left">
              <div className="col-6 mb-2 ml-1 row">
                <span className="col">
                  <TooltipMaker variable="Growing Window" zone={cropZone}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                      Growing Window
                    </Typography>
                  </TooltipMaker>
                </span>
                {/* <span className="col-3">{crop["Growing Window"]}</span> */}
                <span>
                  <div className="blue-bg">
                    <div>
                      <Typography
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '24px',
                        }}
                        variant="body1"
                      >
                        {cropGrowingWindow}
                      </Typography>
                    </div>
                  </div>
                </span>
              </div>
              <InfoGoals crop={crop} attribute="Penetrates Plow Pan" />
              <InfoGoals crop={crop} attribute="Nitrogen Scavenging" />
              <InfoGoals crop={crop} attribute="Reduces Surface Compaction" />
              <InfoGoals crop={crop} attribute="Lasting Residue" />
              <InfoGoals crop={crop} attribute="Improve Soil Organic Matter" />
              <InfoGoals crop={crop} attribute="Prevent Fall Soil Erosion" />
              <InfoGoals
                crop={crop}
                attribute="Increase Soil Aggregation"
                alternate="Improve Soil Aggregation"
              />
              <InfoGoals crop={crop} attribute="Prevent Spring Soil Erosion" />
              <InfoGoals crop={crop} attribute="Good Grazing" />
              <InfoGoals crop={crop} attribute="Forage Harvest Value" />
              <InfoGoals crop={crop} attribute="Pollinator Food" />
              <InfoGoals crop={crop} attribute="Nitrogen Fixation" />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  </div>
);

export default InformationSheetGoals;

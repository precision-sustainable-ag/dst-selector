import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRating } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from './informationSheet.styles';
import TooltipMaker from '../TooltipMaker';

const InformationSheetGoals = ({ crop, cropZone, cropGrowingWindow }) => {
  const classes = useStyles();

  const InfoGoals = ({ attribute, alternate }) =>
    crop[attribute] && (
      <div className="col-6 mb-2 row">
        <span className="col">
          <TooltipMaker variable={attribute} zone={crop.Zone}>
            <Typography variant="body1">{attribute}</Typography>
          </TooltipMaker>
        </span>
        <span>{getRating(crop[attribute] || crop[alternate])}</span>
      </div>
    );

  return (
    <>
      <div className="row mt-2 coverCropGoalsWrapper avoidPage">
        <div className="col-12 p-0">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
              <Typography variant="h6" className="text-uppercase px-3 py-2">
                Goals
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="row col-12 text-right">
                <div className="col-6 mb-2 row">
                  <span className="col">
                    <TooltipMaker variable="Growing Window" zone={cropZone}>
                      <Typography variant="body1">Growing Window</Typography>
                    </TooltipMaker>
                  </span>
                  {/* <span className="col-3">{crop["Growing Window"]}</span> */}
                  <span>
                    <div className="blue-bg">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '20px',
                        }}
                      >
                        <Typography variant="body1">{cropGrowingWindow}</Typography>
                      </div>
                    </div>
                  </span>
                </div>
                <InfoGoals attribute="Penetrates Plow Pan" />
                <InfoGoals attribute="Nitrogen Scavenging" />
                <InfoGoals attribute="Reduces Surface Compaction" />
                <InfoGoals attribute="Lasting Residue" />
                <InfoGoals attribute="Improve Soil Organic Matter" />
                <InfoGoals attribute="Prevent Fall Soil Erosion" />
                <InfoGoals
                  attribute="Increase Soil Aggregation"
                  alternate="Improve Soil Aggregation"
                />
                <InfoGoals attribute="Prevent Spring Soil Erosion" />
                <InfoGoals attribute="Good Grazing" />
                <InfoGoals attribute="Forage Harvest Value" />
                <InfoGoals attribute="Pollinator Food" />
                <InfoGoals attribute="Nitrogen Fixation" />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default InformationSheetGoals;

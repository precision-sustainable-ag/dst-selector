import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { RenderSeedPriceIcons } from '../../../shared/constants';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';
import TooltipMaker from '../../../components/TooltipMaker/TooltipMaker';

const InformationSheetPlanting = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="col-7 col-lg-6 basicAgWrapper">
      <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
        <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
          <AccordionSummary expandIcon={<ExpandMore />} classes={{ expanded: classes.expanded }}>
            <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
              Planting
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row col-12 text-right">
              <div className="col-9 mb-2">
                <TooltipMaker variable="Seeds per Pound" zone={crop.Zone}>
                  <Typography variant="body1">Seeds Per Lb</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Seeds per Pound']}</Typography>
                </div>
              </div>

              <div className="col-9 mb-2">
                <TooltipMaker variable="Seed Price per Pound" zone={crop.Zone}>
                  <Typography variant="body1">Seed Price Per Lb</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg no-bg">
                  <RenderSeedPriceIcons val={crop['Seed Price per Pound']} />
                </div>
              </div>

              <div className="col-9 mb-2">
                <Typography variant="body1">Base Seeding Rate (Lbs/A)</Typography>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop['Base Seeding Rate Min (lbs/A)']} - ${crop['Base Seeding Rate Max (lbs/A)']}`}
                  </Typography>
                </div>
              </div>

              <div className="col-9 mb-2">
                <Typography variant="body1">Drilled Depth</Typography>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">
                    {`${crop['Drilled Depth Min']}" - ${crop['Drilled Depth Max']}"`}
                  </Typography>
                </div>
              </div>

              <div className="col-9 mb-2">
                <TooltipMaker variable="Can Aerial Seed?" zone={crop.Zone}>
                  <Typography variant="body1">Can Aerial Seed?</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Aerial Seeding'] ? 'Yes' : 'No'}</Typography>
                </div>
              </div>

              <div className="col-9 mb-2">
                <TooltipMaker variable="Frost Seeding" zone={crop.Zone}>
                  <Typography variant="body1">Can Frost Seed?</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Frost Seeding'] ? 'Yes' : 'No'}</Typography>
                </div>
              </div>

              <div className="col-9 mb-2">
                <TooltipMaker variable="Min Germination Temp (F)" zone={crop.Zone}>
                  <Typography variant="body1">Min Germination Temp (&deg;F)</Typography>
                </TooltipMaker>
              </div>
              <div className="mb-2">
                <div className="blue-bg">
                  <Typography variant="body1">{crop['Min Germination Temp (F)']}</Typography>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default InformationSheetPlanting;

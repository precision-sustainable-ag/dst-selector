import React from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, useStyles } from '../informationSheet.styles';
import RenderExtendedComments from '../../../components/RenderExtendedComments/RenderExtendedComments';

const ExtendedComments = ({ crop }) => {
  const classes = useStyles();

  return (
    <div className="row otherRows mb-4 avoidPage">
      <div className="col-12 basicAgWrapper">
        <div className="col-12 otherHeaderRow p-0" style={{ marginTop: '1em' }}>
          <Accordion defaultExpanded style={{ border: '1px solid #2b7b79' }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              classes={{ expanded: classes.expanded }}
            >
              <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                Extended Comments
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RenderExtendedComments crop={crop} />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ExtendedComments;

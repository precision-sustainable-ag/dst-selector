import React, { Fragment } from 'react';
import {
  AccordionDetails,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  Divider,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import { Accordion, AccordionSummary } from '../informationSheet.styles';

const InformationSheetReferences = ({ currentSources }) => currentSources.length > 0 && (
<Box component="div" sx={{ width: '100%', m: '0.5rem' }}>
  <Accordion defaultExpanded sx={{ border: '1px solid #2b7b79', boxShadow: 'none' }}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography variant="h6">References & Resources</Typography>
    </AccordionSummary>
    <Divider sx={{ bgcolor: '#2b7b79' }} />
    <AccordionDetails>
      <Typography>
        {currentSources.length > 0
              && currentSources.map((source, index) => (
                <Fragment key={index} sx={{ mt: '0.5rem' }}>
                  <a
                    style={{ textDecoration: 'underline', fontWeight: '500' }}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNewIcon fontSize="0.9rem" />
                    {source.label}
                  </a>
                  {' '}
                  {': '}
                  {source.source}
                  <br />
                </Fragment>
              ))}
      </Typography>
    </AccordionDetails>
  </Accordion>
</Box>
);

export default InformationSheetReferences;

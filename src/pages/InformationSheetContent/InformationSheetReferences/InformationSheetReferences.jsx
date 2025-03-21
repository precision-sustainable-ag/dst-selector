import React, { Fragment, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { PSAAccordion } from 'shared-react-components/src';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const InformationSheetReferences = ({ currentSources }) => {
  const [open, setOpen] = useState(true);

  return currentSources.length > 0 && (
    <Box component="div" sx={{ width: '100%', m: '0.5rem' }}>
      <PSAAccordion
        expanded={open}
        onChange={() => setOpen(!open)}
        summaryContent={<Typography variant="h6">References & Resources</Typography>}
        detailsContent={(
          <Typography>
            {currentSources.length > 0
              && currentSources.map((source, index) => (
                <Fragment key={index}>
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
        )}
        sx={{
          border: '1px solid #2b7b79',
          '.MuiAccordionSummary-root': {
            borderBottom: open ? '1px solid #2b7b79' : '0',
          },
        }}
      />
    </Box>
  );
};

export default InformationSheetReferences;

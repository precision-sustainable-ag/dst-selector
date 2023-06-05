import React, { Fragment } from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary } from '../informationSheet.styles';

const InformationSheetReferences = ({ currentSources }) => (
  currentSources.length > 0 && (
    <div className="row otherRows mb-4 avoidPage">
      <div className="col-12 basicAgWrapper">
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
              <Typography variant="h6" className="px-3 py-2" style={{ border: '0px' }}>
                References & Resources
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" className="p-3">
                {currentSources.length > 0
                && currentSources.map((source, index) => (
                  <Fragment key={index}>
                    <a
                      style={{
                        textDecoration: 'underline',
                        color: 'black',
                        fontWeight: 'bolder',
                      }}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                    {': '}
                    {source.source}
                    <br />
                  </Fragment>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
);

export default InformationSheetReferences;

/* eslint-disable max-len */
/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, {
  useEffect, useState,
} from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography, Tooltip, Box, Grid,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, getRating } from '../../shared/constants';

const InformationSheetContent = ({ crop, modalData }) => {
  const section = window.location.href.includes('species-selector') ? 'selector' : 'explorer';

  // redux vars
  const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const { zone } = filterStateRedux[section];

  // useState vars
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);

  const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    document.title = `${crop.label} Zone ${zone}`;
    if (stateIdRedux && regionIdRedux) {
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?${query}`)
        .then((data) => setCurrentSources(data.data));
      callCoverCropApi(`https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${query}`)
        .then((data) => {
          setAllThumbs(data.data);
          setDataDone(true);
        });
    }
  }, [crop, zone]);

  return dataDone === true && (
    <>
      <CoverCropInformation
        allThumbs={allThumbs}
        crop={crop}
      />
      {modalData && modalData.data.map((cat) => (
        <Box key={cat.id} className="coverCropGoalsWrapper avoidPage">
          <Grid className="basicAgWrapper">
            <Grid>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    '&$expanded': {
                      margin: '4px 0',
                    },
                  }}
                >
                  <Typography variant="h6" style={{ padding: '3px' }} className="text-uppercase">
                    {cat.label}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {' '}
                  <Grid style={{ paddingLeft: '2rem' }} className="row">
                    {cat.attributes.map((att, index) => ((att.label !== 'Comments' && !att.label.startsWith('Notes:') && cat.label !== 'Extended Comments') ? (
                      <Grid style={{ height: '40px', paddingBottom: '40px' }} container item xs={6} direction="column">
                        <Grid xs={6} s={12}>
                          <Tooltip
                            placement="top-end"
                            title={(
                              <div className="filterTooltip">
                                <p>{att.description}</p>
                              </div>
                            )}
                            arrow
                          >
                            <Typography container item sx={{ fontWeight: 'bold' }} variant="body1">
                              {att.label}
                            </Typography>
                          </Tooltip>
                        </Grid>
                        { att.values[0]?.dataType !== 'number' ? (
                          <Typography variant="body1">
                            <Typography style={{ paddingRight: '2rem' }} display="flex" justifyContent="right">{att.values[0]?.value}</Typography>
                          </Typography>
                        ) : (
                          <Typography style={{ paddingRight: '2rem' }} display="flex" justifyContent="right">{getRating(att.values[0]?.value)}</Typography>
                        )}
                      </Grid>
                    )
                      : (
                        <Grid style={{ paddingTop: index === 0 ? '0px' : '25px' }} container item xs={12} direction="column">
                          <Grid xs={12}>
                            <Tooltip
                              placement="top-end"
                              title={(
                                <div className="filterTooltip">
                                  <p>{att.description}</p>
                                </div>
                          )}
                              arrow
                            >
                              {cat.label !== 'Extended Comments'
                                ? (
                                  <Box xs={12} variant="body1">
                                    <Typography display="flex" justifyContent="center" sx={{ fontWeight: 'bold' }}>{att.label}</Typography>
                                    <Typography display="flex" justifyContent="center">{att.values[0]?.value}</Typography>
                                  </Box>
                                )
                                : (
                                  <Box xs={12} variant="body1">
                                    <Typography display="flex" justifyContent="left" sx={{ fontWeight: 'bold' }}>{att.label}</Typography>
                                    <Typography display="flex" justifyContent="left">{att.values[0]?.value}</Typography>
                                  </Box>
                                )}
                            </Tooltip>
                          </Grid>
                        </Grid>
                      )))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      ))}

      <InformationSheetReferences currentSources={currentSources} />
    </>
  );
};

export default InformationSheetContent;

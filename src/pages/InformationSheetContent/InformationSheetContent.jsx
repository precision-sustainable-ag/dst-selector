/* eslint-disable max-len */
/*
  Contains the top level information sheet popup
  BasicCrop contains the default crop
  getMonthDayString gets the start and end dates used in the info sheet
  RenderExtendedComments returns the extended notes for a crop if they exist
*/

import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { PSAAccordion, PSATooltip } from 'shared-react-components/src';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, extractData } from '../../shared/constants';
import pirschAnalytics from '../../shared/analytics';

const InformationSheetContent = ({ crop, modalData }) => {
  // redux vars
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);
  const queryStringRedux = useSelector((stateRedux) => stateRedux.sharedData.queryString);

  const selectedSeason = useSelector((stateRedux) => stateRedux.terminationData.selectedSeason);
  const selectedFlowering = useSelector((stateRedux) => stateRedux.terminationData.selectedFlowering);
  const selectedIrrigation = useSelector((stateRedux) => stateRedux.terminationData.selectedIrrigation);

  // Termination checks
  const seasons = ['Spring Planted', 'Summer Planted', 'Fall Planted', 'Winter Planted'];
  const floweringTypes = ['Annual', 'Perennial'];
  const irrigationType = ['Rainfed', 'Irrigated'];

  function checkTermination(label) {
    const labelSet = new Set(label.split(',').map((item) => item.trim()));

    if (selectedSeason && seasons.some((season) => labelSet.has(season))) {
      const seasonLabel = `${selectedSeason} Planted`;
      if (!labelSet.has(seasonLabel)) {
        return false;
      }
    }

    if (selectedFlowering) {
      if (!labelSet.has(selectedFlowering) && floweringTypes.some((flowering) => labelSet.has(flowering))) {
        return false;
      }
    }

    if (selectedIrrigation) {
      if (!labelSet.has(selectedIrrigation) && irrigationType.some((irrigation) => labelSet.has(irrigation))) {
        return false;
      }
    }

    return true;
  }
  // useState vars
  const [currentSources, setCurrentSources] = useState([{}]);
  const [allThumbs, setAllThumbs] = useState([]);
  const [dataDone, setDataDone] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(
    modalData.data.reduce((res, data) => {
      res[data.label] = true;
      return res;
    }, {}),
  );

  useEffect(() => {
    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?${queryStringRedux}`,
    ).then((data) => {
      setCurrentSources(data.data);
    });

    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${queryStringRedux}`,
    ).then((data) => {
      setAllThumbs(data.data);
      setDataDone(true);
    });
  }, [crop, filterStateRedux]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Information Sheet' } });
  }, []);

  const handleAccordion = (cat) => {
    const open = accordionOpen[cat];
    setAccordionOpen({ ...accordionOpen, [cat]: !open });
  };
  return (
    dataDone === true && (
      <>
        <CoverCropInformation allThumbs={allThumbs} crop={modalData} className="page-break" />
        {modalData
          && modalData.data.map((cat, index) => (
            <Grid
              item
              key={index}
              xs={12}
              className="avoid-break"
              sx={{ marginBottom: '16px' }}
            >
              <PSAAccordion
                sx={{
                  border: '1px solid #e3e1e1',
                  '& .MuiAccordionDetails-root': {
                    padding: '0',
                  },
                }}
                expanded={accordionOpen[cat.label]}
                onChange={() => handleAccordion(cat.label)}
                summaryContent={(
                  <Typography variant="h4" style={{ color: 'grey' }}>
                    {cat.label}
                  </Typography>
                )}
                detailsContent={(
                  <Grid
                    container
                    sx={{
                      backgroundColor: { xs: '#F5F5F5', md: 'white' },
                      justifyContent: 'space-between',
                      borderTop: '1px solid #e3e1e1',
                      padding: { xs: '', md: '10px 15px 0px' },
                      borderRadius: '0 0 30px 30px',
                    }}
                  >
                    {cat.attributes.map((att, catIndex) => {
                      if (councilShorthandRedux === 'WCCC' && att.order === 3 && !checkTermination(att.label)) {
                        return null; // Return null to render nothing for this attribute
                      }
                      return (!att.label.startsWith('Comments')
                      && !att.label.startsWith('Notes:')
                      && cat.label !== 'Extended Comments') ? (
                        <Grid
                          container
                          key={catIndex}
                          item
                          sm={6}
                          xs={12}
                          md={5.7}
                          className="info-sheet-item"
                          sx={{
                            backgroundColor: '#F5F5F5',
                            borderTop: { xs: '1px solid #e6e3e3', md: '' },
                            borderRadius: { xs: '0 0 30px 30px', md: '30px' },
                            boxShadow: { xs: '', md: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
                            marginBottom: { xs: '', md: '20px' },
                            padding: '6px 18px',
                            overflow: 'hidden',
                            wordWrap: 'break-word',
                            minHeight: '40px',
                          }}
                        >
                          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={6} className="attribute-label">
                              <PSATooltip
                                placement="top-end"
                                enterTouchDelay={0}
                                title={att.description}
                                arrow
                                tooltipContent={(
                                  <Typography
                                    sx={{ fontWeight: 'bold' }}
                                    variant="body1"
                                    tabIndex="0"
                                  >
                                    {att.label}
                                  </Typography>
                                  )}
                              />
                            </Grid>
                            <Grid item xs={6} className="attribute-value">
                              <Typography
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  textAlign: 'right',
                                }}
                              >
                                {extractData(att, 'infoSheet', councilShorthandRedux)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        ) : (
                          <Grid item key={catIndex} xs={12} sx={{ padding: '6px 18px' }}>
                            <PSATooltip
                              placement="top-end"
                              enterTouchDelay={0}
                              title={att.description}
                              arrow
                              tooltipContent={(
                                <Box xs={12} tabIndex="0">
                                  <Typography
                                    display="flex"
                                    justifyContent={cat.label !== 'Extended Comments' ? 'center' : 'left'}
                                    sx={{ fontWeight: 'bold' }}
                                  >
                                    {att.label}
                                    {att.order}

                                  </Typography>
                                  <Typography
                                    display="flex"
                                    justifyContent={cat.label !== 'Extended Comments' ? 'center' : 'left'}
                                  >
                                    {att.values[0]?.value}
                                  </Typography>
                                </Box>
                            )}
                            />
                          </Grid>
                        );
                    })}
                  </Grid>
                )}
              />
            </Grid>
          ))}

        <InformationSheetReferences currentSources={currentSources} />
      </>
    )
  );
};

export default InformationSheetContent;

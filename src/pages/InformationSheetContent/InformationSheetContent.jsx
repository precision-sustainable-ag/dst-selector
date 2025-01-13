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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { PSAAccordion, PSATooltip } from 'shared-react-components/src';
import CoverCropInformation from './CoverCropInformation/CoverCropInformation';
import InformationSheetReferences from './InformationSheetReferences/InformationSheetReferences';
import { callCoverCropApi, extractData } from '../../shared/constants';
import pirschAnalytics from '../../shared/analytics';

const InformationSheetContent = ({ crop, modalData }) => {
  // used to know if the user is in mobile mode
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // redux vars
  // const regionIdRedux = useSelector((stateRedux) => stateRedux.mapData.regionId);
  // const stateIdRedux = useSelector((stateRedux) => stateRedux.mapData.stateId);
  const apiBaseUrlRedux = useSelector((stateRedux) => stateRedux.sharedData.apiBaseUrl);
  const filterStateRedux = useSelector((stateRedux) => stateRedux.filterData);
  const councilShorthandRedux = useSelector((stateRedux) => stateRedux.mapData.councilShorthand);

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

  // const query = `${encodeURIComponent('regions')}=${encodeURIComponent(regionIdRedux)}`;

  useEffect(() => {
    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?regions=1222&regions=1317`,
    ).then((data) => {
      console.log('Resources', data);
      setCurrentSources(data.data);
    });

    callCoverCropApi(
      `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?regions=1222&regions=1317`,
    ).then((data) => {
      console.log('Images', data);
      setAllThumbs(data.data);
      setDataDone(true);
    });
  }, [crop, filterStateRedux]);

  // useEffect(() => {
  //   if (stateIdRedux && regionIdRedux) {
  //     callCoverCropApi(
  //       `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/resources?${query}`,
  //     ).then((data) => setCurrentSources(data.data));
  //     callCoverCropApi(
  //       `https://${apiBaseUrlRedux}.covercrop-selector.org/v1/crops/${crop?.id}/images?${query}`,
  //     ).then((data) => {
  //       setAllThumbs(data.data);
  //       setDataDone(true);
  //     });
  //   }
  // }, [crop, filterStateRedux]);

  useEffect(() => {
    pirschAnalytics('Visited Page', { meta: { visited: 'Information Sheet' } });
  }, []);

  const handleAccordion = (cat) => {
    const open = accordionOpen[cat];
    setAccordionOpen({ ...accordionOpen, [cat]: !open });
  };
  console.log('modalData', modalData);
  console.log('dataDone', dataDone);
  return (
    dataDone === true && (
      <>
        <CoverCropInformation allThumbs={allThumbs} crop={modalData} />
        {modalData
          && modalData.data.map((cat, index) => (
            <Grid item key={index} xs={12}>
              <PSAAccordion
                expanded={accordionOpen[cat.label]}
                onChange={() => handleAccordion(cat.label)}
                summaryContent={(
                  <Typography variant="h4" style={{ padding: '3px' }}>
                    {cat.label}
                  </Typography>
                )}
                detailsContent={(
                  <Grid container>
                    {cat.attributes.map((att, catIndex) => (!att.label.startsWith('Comments')
                      && !att.label.startsWith('Notes:')
                      && cat.label !== 'Extended Comments' ? (
                        <Grid
                          container
                          key={catIndex}
                          item
                          md={6}
                          sm={12}
                          direction={isMobile ? 'row' : 'column'}
                        >
                          <Grid item xs={12}>
                            <PSATooltip
                              placement="top-end"
                              enterTouchDelay={0}
                              title={att.description}
                              arrow
                              tooltipContent={(
                                <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                                  {att.label}
                                </Typography>
                              )}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              style={{ paddingRight: '2rem' }}
                              display="flex"
                              justifyContent={isMobile ? 'left' : 'right'}
                              textAlign="right"
                            >
                              {extractData(att, 'infoSheet', councilShorthandRedux)}
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid item key={catIndex} xs={12}>
                          <PSATooltip
                            placement="top-end"
                            enterTouchDelay={0}
                            title={att.description}
                            arrow
                            tooltipContent={(
                              cat.label !== 'Extended Comments' ? (
                                <Box xs={12} variant="body1">
                                  <Typography
                                    display="flex"
                                    justifyContent="center"
                                    sx={{ fontWeight: 'bold' }}
                                  >
                                    {att.label}
                                  </Typography>
                                  <Typography display="flex" justifyContent="center">
                                    {att.values[0]?.value}
                                  </Typography>
                                </Box>
                              ) : (
                                <Box xs={12} variant="body1">
                                  <Typography
                                    display="flex"
                                    justifyContent="left"
                                    sx={{ fontWeight: 'bold' }}
                                  >
                                    {att.label}
                                  </Typography>
                                  <Typography display="flex" justifyContent="left">
                                    {att.values[0]?.value}
                                  </Typography>
                                </Box>
                              )
                            )}
                          />
                        </Grid>
                      )))}
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
